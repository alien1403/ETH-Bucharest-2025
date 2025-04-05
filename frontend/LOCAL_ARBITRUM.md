# Using Local Arbitrum Nitro Node

This document provides instructions on how to use the local Arbitrum Nitro node for development and testing.

## Prerequisites

- Node.js and npm/pnpm installed
- Local Arbitrum Nitro node running on `http://localhost:8547`

## Setup

1. Make sure your local Arbitrum Nitro node is running on `http://localhost:8547`

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Deploy your contract manually to the local node and update the configuration:

   - Deploy your contract using your preferred method (e.g., Remix, Foundry, etc.)
   - Update the `lib/config.ts` file with the deployed contract address:
     ```typescript
     // In lib/config.ts
     export const CONTRACT_ADDRESSES = {
     	// ... other environments
     	local: '0xYourDeployedContractAddress', // Replace with your actual deployed contract address
     } as const;
     ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Connecting to the Local Node

The application is configured to connect to your local Arbitrum node when in development mode. The configuration is in `lib/config.ts` and `lib/wagmi.ts`.

## Testing the Contract

1. Create a new vote using the "Create Vote" page
2. Connect your wallet (MetaMask or other Web3 wallet)
3. Submit the vote creation transaction
4. Check the console logs for transaction details

## Troubleshooting

If you encounter issues connecting to the local node:

1. Make sure the node is running and accessible at `http://localhost:8547`
2. Check that your wallet is connected to the correct network (chainId: 412346)
3. Verify that the contract is deployed correctly by checking the contract address in `lib/config.ts`

## Switching Between Environments

The application supports different environments:

- `local`: Local Arbitrum Nitro node
- `development`: Development environment (e.g., Arbitrum Goerli)
- `test`: Test environment (e.g., Arbitrum Sepolia)
- `production`: Production environment (Arbitrum One)

To switch environments, update the `NODE_ENV` environment variable or modify the `getCurrentEnvironment` function in `lib/config.ts`.
