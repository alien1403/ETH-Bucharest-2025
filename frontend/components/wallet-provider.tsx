'use client';

import { ReactNode, useEffect } from 'react';
import { useWalletStore } from '@/hooks/use-wallet-store';
import {
	useAccount,
	useConnect,
	useDisconnect,
	useChainId,
	useSwitchChain,
} from 'wagmi';
import { metaMask } from 'wagmi/connectors';

// Arbitrum One chain ID
const ARBITRUM_CHAIN_ID = 412346; // local chain id

interface WalletProviderProps {
	children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
	const {
		address,
		chainId,
		isConnected,
		isConnecting,
		error,
		connect,
		disconnect,
		setAddress,
		setChainId,
		setError,
		updateLastActivity,
		checkInactivity,
	} = useWalletStore();

	// Wagmi hooks
	const { address: wagmiAddress, isConnected: wagmiIsConnected } = useAccount();
	const currentChainId = useChainId();
	const { switchChainAsync } = useSwitchChain();
	const { connectAsync, isPending: isConnectingWagmi } = useConnect();
	const { disconnectAsync } = useDisconnect();

	// Sync wallet state with wagmi
	useEffect(() => {
		if (wagmiAddress) {
			setAddress(wagmiAddress);
		}

		if (currentChainId) {
			setChainId(currentChainId);
		}
	}, [wagmiAddress, currentChainId, setAddress, setChainId]);

	// Check for inactivity periodically
	useEffect(() => {
		if (isConnected) {
			const interval = setInterval(() => {
				checkInactivity();
			}, 60000); // Check every minute

			return () => clearInterval(interval);
		}
	}, [isConnected, checkInactivity]);

	// Handle wallet connection
	const handleConnect = async () => {
		try {
			updateLastActivity();
			await connectAsync({ connector: metaMask() });

			// Check if we're on Arbitrum, if not, switch
			if (currentChainId !== ARBITRUM_CHAIN_ID) {
				await switchChainAsync({ chainId: ARBITRUM_CHAIN_ID });
			}
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'Failed to connect wallet'
			);
		}
	};

	// Handle wallet disconnection
	const handleDisconnect = async () => {
		try {
			await disconnectAsync();
			disconnect();
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'Failed to disconnect wallet'
			);
		}
	};

	// Expose wallet methods to children
	const walletContext = {
		address,
		chainId,
		isConnected,
		isConnecting: isConnecting || isConnectingWagmi,
		error,
		connect: handleConnect,
		disconnect: handleDisconnect,
		isArbitrum: chainId === ARBITRUM_CHAIN_ID,
	};

	return <div onClick={updateLastActivity}>{children}</div>;
}
