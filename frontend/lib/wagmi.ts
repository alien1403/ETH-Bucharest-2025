'use client';

import { http, createConfig } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

// Arbitrum One RPC URLs
const ARBITRUM_RPC_URLS = [
	'https://arb1.arbitrum.io/rpc', // Primary public RPC
	'https://arbitrum.llamarpc.com', // Fallback RPC
];

// Create wagmi config
export const config = createConfig({
	chains: [arbitrum],
	connectors: [metaMask()],
	transports: {
		[arbitrum.id]: http(ARBITRUM_RPC_URLS[0]),
	},
});

// Export chain IDs for reference
export const CHAIN_IDS = {
	ARBITRUM: 42161,
};
