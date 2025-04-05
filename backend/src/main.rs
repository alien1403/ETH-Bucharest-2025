// WORKING with whitelisted wallets

use elastic_elgamal::{group::Ristretto, Keypair, PublicKey, SecretKey, Ciphertext, DiscreteLogTable};
use elastic_elgamal::app::{ChoiceParams, EncryptedChoice, SingleChoice};
use rand::thread_rng;
use serde::{Serialize, Deserialize};
use std::collections::HashSet;
use std::sync::Arc;
use tokio::sync::Mutex;
use warp::{Filter, reject::Reject, Reply, Rejection};
use hex;

#[derive(Debug)]
struct NotWhitelisted;
impl Reject for NotWhitelisted {}

#[derive(Debug)]
struct AlreadyVoted;
impl Reject for AlreadyVoted {}

#[derive(Serialize, Deserialize)]
struct VoteRequest {
    wallet: String,
    choice: u64,
}

#[derive(Serialize)]
struct VoteResponse {
    success: bool,
}

#[derive(Serialize)]
struct PublicKeyWrapper(#[serde(with = "hex")] Vec<u8>);

#[derive(Clone)]
struct AppState {
    votes: Arc<Mutex<Vec<EncryptedChoice<Ristretto, SingleChoice>>>>,
    public_key: PublicKey<Ristretto>,
    secret_key: SecretKey<Ristretto>,
    whitelist: Vec<String>,
    voted_wallets: Arc<Mutex<HashSet<String>>>, // Track wallets that have voted
    options_count: usize,
}

fn generate_keypair() -> Keypair<Ristretto> {
    let mut rng = thread_rng();
    Keypair::<Ristretto>::generate(&mut rng)
}

fn encrypt_vote(params: &ChoiceParams<Ristretto, SingleChoice>, choice: u64) -> EncryptedChoice<Ristretto, SingleChoice> {
    let mut rng = thread_rng();
    EncryptedChoice::single(params, choice.try_into().unwrap(), &mut rng)
}

fn aggregate_votes_per_option(votes: Vec<EncryptedChoice<Ristretto, SingleChoice>>, params: &ChoiceParams<Ristretto, SingleChoice>) -> Vec<Ciphertext<Ristretto>> {
    let mut aggregated = vec![Ciphertext::zero(); params.options_count()];
    for vote in votes {
        let choices = vote.verify(params).unwrap();
        for (i, &choice) in choices.iter().enumerate() {
            aggregated[i] = aggregated[i] + choice;
        }
    }
    aggregated
}

fn decrypt_votes(secret_key: &SecretKey<Ristretto>, aggregated: Vec<Ciphertext<Ristretto>>) -> Vec<u64> {
    let lookup = DiscreteLogTable::new(0..=aggregated.len() as u64);
    aggregated.iter().map(|c| secret_key.decrypt(*c, &lookup).unwrap()).collect()
}

async fn handle_rejection(err: warp::Rejection) -> Result<impl Reply, Rejection> {
    if let Some(_) = err.find::<NotWhitelisted>() {
        let json = warp::reply::json(&VoteResponse { success: false });
        return Ok(warp::reply::with_status(json, warp::http::StatusCode::FORBIDDEN));
    }
    if let Some(_) = err.find::<AlreadyVoted>() {
        let json = warp::reply::json(&VoteResponse { success: false });
        return Ok(warp::reply::with_status(json, warp::http::StatusCode::CONFLICT)); // 409 Conflict
    }
    Err(err)
}

#[tokio::main]
async fn main() {
    let keypair = generate_keypair();
    let public_key = keypair.public().clone();
    let secret_key = keypair.secret().clone();

    let votes = Arc::new(Mutex::new(Vec::new()));
    let voted_wallets = Arc::new(Mutex::new(HashSet::new())); // Initialize empty set for tracking voted wallets

    let whitelist = vec![
        "wallet1".to_string(),
        "wallet2".to_string(),
        "wallet3".to_string(),
    ];

    let options_count = 5;

    let choice_params = ChoiceParams::<Ristretto, SingleChoice>::single(public_key.clone(), options_count);

    let state = AppState {
        votes,
        public_key,
        secret_key,
        whitelist,
        voted_wallets,
        options_count,
    };

    let state_filter = warp::any().map(move || state.clone());
    let params_filter = warp::any().map(move || choice_params.clone());

    // Endpoint to get the public key
    let get_pk = warp::path("public_key")
        .and(state_filter.clone())
        .map(|state: AppState| {
            let pk_bytes = state.public_key.as_bytes().to_vec();
            warp::reply::json(&PublicKeyWrapper(pk_bytes))
        });

    // Endpoint to submit a vote
    let submit_vote = warp::path("vote")
        .and(warp::post())
        .and(warp::body::json())
        .and(state_filter.clone())
        .and(params_filter.clone())
        .and_then(
            |req: VoteRequest,
             state: AppState,
             params: ChoiceParams<Ristretto, SingleChoice>| async move {
                // Check if wallet is whitelisted
                if !state.whitelist.contains(&req.wallet) {
                    return Err(warp::reject::custom(NotWhitelisted));
                }

                // Check if wallet has already voted
                let mut voted_wallets = state.voted_wallets.lock().await;
                if voted_wallets.contains(&req.wallet) {
                    return Err(warp::reject::custom(AlreadyVoted));
                }

                // Validate choice
                if req.choice >= state.options_count as u64 {
                    return Err(warp::reject()); // Invalid choice
                }

                // Encrypt the vote and store it
                let encrypted_vote = encrypt_vote(&params, req.choice);
                let mut votes = state.votes.lock().await;
                votes.push(encrypted_vote);

                // Mark wallet as having voted
                voted_wallets.insert(req.wallet);

                Ok::<_, Rejection>(warp::reply::json(&VoteResponse { success: true }))
            },
        );

    // Endpoint to get results
    let get_results = warp::path("results")
        .and(state_filter)
        .and(params_filter)
        .and_then(
            |state: AppState,
             params: ChoiceParams<Ristretto, SingleChoice>| async move {
                let votes_guarded = state.votes.lock().await;
                if votes_guarded.is_empty() {
                    return Ok::<_, Rejection>(warp::reply::json(&vec![0u64; state.options_count]));
                }

                let aggregated_votes =
                    aggregate_votes_per_option(votes_guarded.clone(), &params);
                let totals =
                    decrypt_votes(&state.secret_key, aggregated_votes);
                Ok::<_, Rejection>(warp::reply::json(&totals))
            },
        );

    // Combine routes and add rejection handler
    let routes = get_pk.or(submit_vote).or(get_results).recover(handle_rejection);

    println!("Server running at http://127.0.0.1:3030");

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}


