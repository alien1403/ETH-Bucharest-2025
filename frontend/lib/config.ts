// Contract addresses for different environments
export const CONTRACT_ADDRESSES = {
	development: '0x1234567890123456789012345678901234567890', // Replace with your development contract address
	production: '0x1234567890123456789012345678901234567890', // Replace with your production contract address
	test: '0x1234567890123456789012345678901234567890', // Replace with your test contract address
	local: '0xe1080224b632a93951a7cfa33eeea9fd81558b5e', // Replace with your manually deployed local contract address
} as const;

// RPC URLs for different environments
export const RPC_URLS = {
	development: 'https://goerli.infura.io/v3/your-api-key', // Replace with your development RPC URL
	production: 'https://arb1.arbitrum.io/rpc', // Arbitrum One mainnet
	test: 'https://sepolia-rollup.arbitrum.io/rpc', // Arbitrum Sepolia testnet
	local: 'http://localhost:8547', // Local Arbitrum Nitro node
} as const;

type Environment = keyof typeof CONTRACT_ADDRESSES;

// Get the current environment
export const getCurrentEnvironment = (): Environment => {
	// Always use local environment
	return 'local';
};

// Get the contract address for the current environment
export const getContractAddress = () => {
	const environment = getCurrentEnvironment();
	return CONTRACT_ADDRESSES[environment];
};

// Get the RPC URL for the current environment
export const getRpcUrl = () => {
	const environment = getCurrentEnvironment();
	return RPC_URLS[environment];
};
