'use client';

import { createConfig, http } from 'wagmi';
import { arbitrum, arbitrumGoerli, arbitrumSepolia } from 'wagmi/chains';
import { getRpcUrl } from './config';

// Define the local chain for Arbitrum Nitro
const localArbitrum = {
	id: 412346,
	name: 'Local Arbitrum',
	network: 'local-arbitrum',
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH',
	},
	rpcUrls: {
		default: {
			http: ['http://localhost:8547'],
		},
		public: {
			http: ['http://localhost:8547'],
		},
	},
	blockExplorers: {
		default: { name: 'Local Explorer', url: 'http://localhost:8547' },
	},
	testnet: true,
};

// Create wagmi config
export const config = createConfig({
	chains: [arbitrum, arbitrumGoerli, arbitrumSepolia, localArbitrum],
	transports: {
		[arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
		[arbitrumGoerli.id]: http('https://goerli-rollup.arbitrum.io/rpc'),
		[arbitrumSepolia.id]: http('https://sepolia-rollup.arbitrum.io/rpc'),
		[localArbitrum.id]: http('http://localhost:8547'),
	},
});

// Export chains for use in other parts of the app
export const chains = [
	arbitrum,
	arbitrumGoerli,
	arbitrumSepolia,
	localArbitrum,
];
