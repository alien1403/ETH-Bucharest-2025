#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;
use alloy_primitives::ruint::aliases::U8;
use elastic_elgamal::{group::Ristretto, *};
use elastic_elgamal::app::{EncryptedChoice, SingleChoice};
use stylus_sdk::storage::StorageU8;
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    msg,
    prelude::*,
    storage::{
        StorageAddress, StorageBool, StorageBytes, StorageMap, StorageString, StorageU256,
        StorageVec,
    },
};

   #[storage]
   #[entrypoint]
    pub struct VotingSystem {
        campaigns: StorageMap<U256, Campaign>,
        campaign_count: StorageU256,
    }

#[storage]
pub struct Campaign {
    owner: StorageAddress,
    description: StorageString,
    start_time: StorageU256,
    end_time: StorageU256,
    option_count: StorageU8,
    public_key: StorageBytes,
    is_tallyed: StorageBool,
    has_voted: StorageMap<Address, StorageBool>,
    votes: StorageVec<StorageBytes>,
}

#[public]
impl VotingSystem {
    pub fn create_campaign(
        &mut self,
        description: String,
        start_time: U256,
        end_time: U256,
        option_count: u8,
        public_key: Vec<u8>,
    ) -> U256 {
        // Validate inputs
        assert!(
            option_count > 1 && option_count <= 10,
            "Invalid option count"
        );
        assert!(end_time > start_time, "End time must be after start time");

        // // Validate the public key by attempting to parse it
        let _ = PublicKey::<Ristretto>::from_bytes(&public_key).expect("Invalid public key format");

        // Get the next campaign ID
        let campaign_id = self.campaign_count.get();
        self.campaign_count.set(campaign_id + U256::from(1));

        // Store the campaign
        let mut new_campaign = self.campaigns.setter(campaign_id);
        new_campaign.owner.set(msg::sender());
        new_campaign.description.set_str(description);
        new_campaign.start_time.set(start_time);
        new_campaign.end_time.set(end_time);
        new_campaign.option_count.set(U256::from(option_count));
        new_campaign.public_key.set_bytes(public_key);
        new_campaign.is_tallyed.set(false);

        // // Return the campaign ID
        // campaign_id
        U256::from(25)
    }

    pub fn vote(&mut self, encrypted_vote: Vec<u8>, campaign_id: U256) {
        // Retrieve the campaign
        let campaign = self.campaigns.getter(campaign_id);
        
        // Verify campaign exists
        assert!(campaign.is_tallyed.get(), "Campaign has been tallied");
        
        // Check voting period
        // let current_time = U256::from(block_timestamp());
        // assert!(current_time >= campaign.startTime.get(), "Voting has not started yet");
        // assert!(current_time <= campaign.endTime.get(), "Voting has ended");
        
        // Check if user has already voted
        assert!(!campaign.has_voted.getter(msg::sender()).get(), "Already voted");
        
        // Mark the user as having voted
        let mut campaign = self.campaigns.setter(campaign_id);
        campaign.has_voted.setter(msg::sender()).set(true);

        let length = campaign.votes.len();
        campaign.votes.grow();
        campaign.votes.setter(length).unwrap().set_bytes(encrypted_vote.clone());
    }

    pub fn tally_votes(&mut self, campaign_id: U256) {
        // Retrieve the campaign
        let mut campaign = self.campaigns.setter(campaign_id);
        
        assert!(campaign.is_tallyed.get(), "Campaign has already been tallied");
        assert!(msg::sender() == campaign.owner.get(), "Only the owner can tally votes");
        
        // Tally votes
        let pk_bytes = campaign.public_key.get_bytes();
        let public_key = PublicKey::<Ristretto>::from_bytes(&pk_bytes)
            .expect("Invalid public key format");
        let votes = &campaign.votes;

        let options_count = campaign.option_count.get().to::<usize>();
        let mut encrypted_totals = vec![Ciphertext::zero(); usize::from(options_count)];

        for i in 0..votes.len() {
            let encrypted_vote_bytes = votes.get(i).unwrap().get_bytes();
            
            // Deserialize the encrypted vote
            let encrypted_choice = EncryptedChoice::<Ristretto, SingleChoice>::
            
            // Verify the vote
            let pk_bytes = campaign.publicKey.get();
            let public_key = PublicKey::<Ristretto>::from_bytes(&pk_bytes)
                .expect("Invalid public key format");
            let choice_params = ChoiceParams::single(public_key, options_count);
            let choice_ciphertexts = encrypted_choice.verify(&choice_params)
                .expect("Invalid vote");
            
            // Add the vote ciphertexts to our running tallies
            for (tally, &vote) in encrypted_tallies.iter_mut().zip(choice_ciphertexts.iter()) {
                *tally += vote;
            }
        }
        // Store the tally result
    }


    pub fn get_campaign_owner(&self, campaign_id: U256) -> Address {
        self.campaigns.getter(campaign_id).owner.get()
    }

    pub fn get_campaign_description(&self, campaign_id: U256) -> String {
        self.campaigns.getter(campaign_id).description.get_string()
    }

    pub fn get_campaign_start_time(&self, campaign_id: U256) -> U256 {
        self.campaigns.getter(campaign_id).start_time.get()
    }

    pub fn get_campaign_end_time(&self, campaign_id: U256) -> U256 {
        self.campaigns.getter(campaign_id).end_time.get()
    }
    
    pub fn get_campaign_option_count(&self, campaign_id: U256) -> U8 {
        self.campaigns.getter(campaign_id).option_count.get()
    }

    pub fn get_campaign_public_key(&self, campaign_id: U256) -> Vec<u8> {
        self.campaigns.getter(campaign_id).public_key.get_bytes()
    }

    pub fn is_campaign_tallied(&self, campaign_id: U256) -> bool {
        self.campaigns.getter(campaign_id).is_tallyed.get()
    }
}