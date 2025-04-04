'use client';

import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { useWalletStore } from './use-wallet-store';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

// Arbitrum One chain ID
const ARBITRUM_CHAIN_ID = 42161;

interface WalletContextType {
	address: string | null;
	chainId: number | null;
	isConnected: boolean;
	isConnecting: boolean;
	error: string | null;
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
	isArbitrum: boolean;
	updateLastActivity: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletContextProvider({ children }: { children: ReactNode }) {
	const {
		address,
		chainId,
		isConnected,
		isConnecting,
		error,
		connect: storeConnect,
		disconnect: storeDisconnect,
		setAddress,
		setChainId,
		setError,
		updateLastActivity,
		initializeFromStorage,
	} = useWalletStore();

	// Wagmi hooks
	const {
		address: wagmiAddress,
		isConnected: wagmiIsConnected,
		chain,
	} = useAccount();
	const { connectAsync, isPending: isConnectingWagmi } = useConnect();
	const { disconnectAsync } = useDisconnect();

	// Handle wallet connection
	const handleConnect = async () => {
		try {
			updateLastActivity();
			await connectAsync({ connector: metaMask() });

			// Check if we're on Arbitrum, if not, switch
			if (chain?.id !== ARBITRUM_CHAIN_ID) {
				// We'll handle network switching in a separate function
				console.log('Need to switch to Arbitrum network');
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
			storeDisconnect();
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'Failed to disconnect wallet'
			);
		}
	};

	// Sync wallet state with wagmi - moved to useEffect to avoid render-time updates
	useEffect(() => {
		console.log('Wagmi wallet state:', {
			wagmiAddress,
			wagmiIsConnected,
			chain,
		});

		if (wagmiAddress && wagmiAddress !== address) {
			console.log('Updating wallet address:', wagmiAddress);
			setAddress(wagmiAddress);
		}

		if (chain && chain.id !== chainId) {
			console.log('Updating chain ID:', chain.id);
			setChainId(chain.id);
		}
	}, [wagmiAddress, chain, address, chainId, setAddress, setChainId]);

	// Initialize wallet state from persisted data
	useEffect(() => {
		// This effect runs once on mount to initialize the wallet state
		// without triggering state updates during render
		if (wagmiAddress && !address) {
			initializeFromStorage(wagmiAddress, chain?.id || null);
		}
	}, [wagmiAddress, chain, address, initializeFromStorage]);

	const value = {
		address,
		chainId,
		isConnected,
		isConnecting: isConnecting || isConnectingWagmi,
		error,
		connect: handleConnect,
		disconnect: handleDisconnect,
		isArbitrum: chainId === ARBITRUM_CHAIN_ID,
		updateLastActivity,
	};

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
}

export function useWallet() {
	const context = useContext(WalletContext);
	if (context === undefined) {
		throw new Error('useWallet must be used within a WalletContextProvider');
	}
	return context;
}
