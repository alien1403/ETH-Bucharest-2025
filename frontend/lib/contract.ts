'use client';

import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import contractAbi from '@/contract-abi.json';

// Contract address on Arbitrum One
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual contract address

// Contract ABI
const abi = contractAbi;

// Hook to create a campaign
export function useCreateCampaign() {
	const { data, writeContract, isError, isPending, isSuccess } =
		useContractWrite();

	const createCampaign = async (params: any) => {
		return writeContract({
			address: CONTRACT_ADDRESS,
			abi,
			functionName: 'createCampaign',
			args: params,
		});
	};

	return {
		createCampaign,
		isLoading: isPending,
		isError,
		isSuccess,
		data,
	};
}

// Hook to vote on a campaign
export function useVote() {
	const { data, writeContract, isError, isPending, isSuccess } =
		useContractWrite();

	const vote = async (params: any) => {
		return writeContract({
			address: CONTRACT_ADDRESS,
			abi,
			functionName: 'vote',
			args: params,
		});
	};

	return {
		vote,
		isLoading: isPending,
		isError,
		isSuccess,
		data,
	};
}

// Hook to get campaign description
export function useCampaignDescription(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi,
		functionName: 'getCampaignDescription',
		args: [campaignId],
	});

	return {
		description: data,
		isLoading,
		isError,
	};
}

// Hook to get campaign end time
export function useCampaignEndTime(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi,
		functionName: 'getCampaignEndTime',
		args: [campaignId],
	});

	return {
		endTime: data,
		isLoading,
		isError,
	};
}

// Hook to get campaign option count
export function useCampaignOptionCount(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi,
		functionName: 'getCampaignOptionCount',
		args: [campaignId],
	});

	return {
		optionCount: data,
		isLoading,
		isError,
	};
}

// Hook to get campaign public key
export function useCampaignPublicKey(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi,
		functionName: 'getCampaignPublicKey',
		args: [campaignId],
	});

	return {
		publicKey: data,
		isLoading,
		isError,
	};
}

// Hook to check if campaign is tallied
export function useIsCampaignTallied(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi,
		functionName: 'isCampaignTallied',
		args: [campaignId],
	});

	return {
		isTallied: data,
		isLoading,
		isError,
	};
}

// Hook to tally votes
export function useTallyVotes() {
	const { data, writeContract, isError, isPending, isSuccess } =
		useContractWrite();

	const tallyVotes = async (campaignId: bigint) => {
		return writeContract({
			address: CONTRACT_ADDRESS,
			abi,
			functionName: 'tallyVotes',
			args: [campaignId],
		});
	};

	return {
		tallyVotes,
		isLoading: isPending,
		isError,
		isSuccess,
		data,
	};
}
