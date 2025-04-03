#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;
use elastic_elgamal::{group::Ristretto, *};
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    msg,
    prelude::*, storage::{StorageAddress, StorageBool, StorageBytes, StorageMap, StorageString, StorageU256, StorageVec},
};

   #[storage]
   #[entrypoint]
    pub struct VotingSystem {
        campaigns: StorageMap<U256, Campaign>,
        campaignCount: StorageU256,
    }


#[storage]
pub struct Campaign {
    owner: StorageAddress,
    description: StorageString,
    startTime: StorageU256,
    endTime: StorageU256,
    optionCount: StorageU256,
    publicKey: StorageBytes,
    isTallyed: StorageBool,
}

#[public]
impl VotingSystem {
    /// Create a new voting campaign
    pub fn create_campaign(
        &mut self,
        description: String,
        start_time: U256,
        end_time: U256,
        option_count: u8,
        public_key: Vec<u8>,
    ) -> U256 {
        // Validate inputs
        assert!(option_count > 1 && option_count <= 10, "Invalid option count");
        assert!(end_time > start_time, "End time must be after start time");
        
        // Validate the public key by attempting to parse it
        let _ = PublicKey::<Ristretto>::from_bytes(&public_key)
            .expect("Invalid public key format");

        // Get the next campaign ID
        let campaign_id = self.campaignCount.get();
        self.campaignCount.set(campaign_id + U256::from(1));

        // Store the campaign
        let mut new_campaign = self.campaigns.setter(campaign_id);
        new_campaign.owner.set(msg::sender());
        new_campaign.description.set_str(description);
        new_campaign.startTime.set(start_time);
        new_campaign.endTime.set(end_time);
        new_campaign.optionCount.set(U256::from(option_count));
        new_campaign.publicKey.set_bytes(public_key);
        new_campaign.isTallyed.set(false);

        // Return the campaign ID
        campaign_id
    }
}