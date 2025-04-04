#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;
use elastic_elgamal::{group::Ristretto, *};
use stylus_sdk::storage::StorageGuardMut;
use stylus_sdk::{
    alloy_primitives::{Address, U256, U8},
    msg,
    prelude::*,
    storage::{
        StorageAddress, StorageBool, StorageBytes, StorageMap, StorageString, StorageU256, StorageU8,
        StorageVec,
    },
    abi::Bytes,
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
    is_tallyed: StorageBool,
    has_voted: StorageMap<Address, StorageBool>,
    option_to_votes: StorageMap<U8, StorageU256>,

    //secure votes
    public_key: StorageBytes,
    votes: StorageVec<StorageVec<StorageBytes>>,
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
        assert!(
            option_count > 1 && option_count <= 6,
            "Invalid option count"
        );
        assert!(end_time > start_time, "End time must be after start time");

        // // Validate the public key by attempting to parse it
        let _ = PublicKey::<Ristretto>::from_bytes(&public_key).expect("Invalid public key format");

        let campaign_id = self.campaign_count.get();
        self.campaign_count.set(campaign_id + U256::from(1));

        let mut new_campaign = self.campaigns.setter(campaign_id);
        new_campaign.owner.set(msg::sender());
        new_campaign.description.set_str(description);
        new_campaign.start_time.set(start_time);
        new_campaign.end_time.set(end_time);
        new_campaign.option_count.set(U8::from(option_count));
        new_campaign.public_key.set_bytes(public_key);
        new_campaign.is_tallyed.set(false);

        campaign_id
    }

    pub fn secure_vote(&mut self, encrypted_vote: Vec<Bytes>, campaign_id: U256) {
        let campaign = self.campaigns.getter(campaign_id);
        
        assert!(campaign.is_tallyed.get(), "Campaign has been tallied");
        assert!(!campaign.has_voted.getter(msg::sender()).get(), "Already voted");

        // Check voting period
        // let current_time = U256::from(block_timestamp());
        // assert!(current_time >= campaign.startTime.get(), "Voting has not started yet");
        // assert!(current_time <= campaign.endTime.get(), "Voting has ended");
        
        let mut campaign = self.campaigns.setter(campaign_id);

        campaign.has_voted.setter(msg::sender()).set(true);

        let mut new_vec: StorageGuardMut<StorageVec<StorageBytes>> = campaign.votes.grow();
        for (index, bytes) in encrypted_vote.into_iter().enumerate() {
            new_vec.setter(index).unwrap().set_bytes(bytes);
        }
    }

    pub fn vote(&mut self, option: U8, campaign_id: U256) {
        let campaign = self.campaigns.getter(campaign_id);
        
        assert!(campaign.is_tallyed.get(), "Campaign has been tallied");
        assert!(!campaign.has_voted.getter(msg::sender()).get(), "Already voted");

        let option_count = campaign.option_count.get();
        assert!(option < option_count, "Invalid option");

        // Check voting period
        // let current_time = U256::from(block_timestamp());
        // assert!(current_time >= campaign.startTime.get(), "Voting has not started yet");
        // assert!(current_time <= campaign.endTime.get(), "Voting has ended");
        
        let mut campaign = self.campaigns.setter(campaign_id);

        campaign.has_voted.setter(msg::sender()).set(true);

        let current_votes = campaign.option_to_votes.getter(option).get();
        campaign
            .option_to_votes
            .setter(option)
            .set(current_votes + U256::from(1));
    }

    pub fn tally_votes(&mut self, campaign_id: U256){
        let campaign = self.campaigns.get(campaign_id);
        
        assert!(campaign.is_tallyed.get(), "Campaign has already been tallied");
        assert!(msg::sender() == campaign.owner.get(), "Only the owner can tally votes");
    }

    pub fn get_votes_for_campaign(&self, campaign_id: U256) -> Vec<U256> {
        let num_options = self.campaigns.getter(campaign_id).option_count.get().to::<u8>();
        let mut all_votes = Vec::<U256>::new();
        for i in 0..num_options {
            let votes = self.campaigns.getter(campaign_id).option_to_votes.getter(U8::from(i)).get();
            all_votes.push(votes);
        }

        all_votes
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