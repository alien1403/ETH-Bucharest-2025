'use client';

import {
	useContractRead,
	useWriteContract,
	type UseWriteContractReturnType,
} from 'wagmi';
import { parseEther } from 'viem';
import contractAbi from '@/contract-abi.json';
import { getContractAddress } from './config';

// Contract ABI
const abi = contractAbi;

// Hook to create a campaign
export function useCreateCampaign() {
	const { writeContractAsync, isError, isPending, isSuccess } =
		useWriteContract();

	const createCampaign = async (params: {
		title: string;
		description: string;
		startTime: number;
		endTime: number;
		optionCount: number;
		publicKey: number[];
		eligibleVoters: string[];
	}): Promise<string> => {
		try {
			console.log('Creating campaign with params:', params);
			console.log('Using contract address:', getContractAddress());

			// Limit the number of eligible voters to reduce gas costs
			// In a real application, you might want to handle this differently
			const limitedEligibleVoters = params.eligibleVoters.slice(0, 10);

			if (params.eligibleVoters.length > 10) {
				console.warn(
					`Limiting eligible voters from ${params.eligibleVoters.length} to 10 to reduce gas costs`
				);
			}

			const hash = await writeContractAsync({
				address: getContractAddress(),
				abi,
				functionName: 'createCampaign',
				args: [
					params.title,
					params.description,
					params.startTime,
					params.endTime,
					params.optionCount,
					params.publicKey,
					limitedEligibleVoters,
				],
				// Add gas limit to prevent excessive gas usage
				gas: BigInt(5000000), // 5 million gas units
			});

			console.log('Transaction hash:', hash);
			return hash;
		} catch (error) {
			console.error('Error in createCampaign:', error);
			throw error;
		}
	};

	return {
		createCampaign,
		isLoading: isPending,
		isError,
		isSuccess,
	};
}

// Hook to vote on a campaign
export function useVote() {
	const { writeContractAsync, isError, isPending, isSuccess } =
		useWriteContract();

	const vote = async (params: { option: number; campaignId: number }) => {
		console.log('Voting with params:', params);
		console.log('Using contract address:', getContractAddress());

		return writeContractAsync({
			address: getContractAddress(),
			abi,
			functionName: 'vote',
			args: [params.option, params.campaignId],
		});
	};

	return {
		vote,
		isLoading: isPending,
		isError,
		isSuccess,
	};
}

// Hook to get campaign description
export function useCampaignDescription(campaignId: bigint) {
	const { data, isError, isLoading } = useContractRead({
		address: getContractAddress(),
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
		address: getContractAddress(),
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
		address: getContractAddress(),
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
		address: getContractAddress(),
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
		address: getContractAddress(),
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
	const { writeContractAsync, isError, isPending, isSuccess } =
		useWriteContract();

	const tallyVotes = async (campaignId: bigint) => {
		console.log('Tallying votes for campaign:', campaignId);
		console.log('Using contract address:', getContractAddress());

		return writeContractAsync({
			address: getContractAddress(),
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
	};
}
