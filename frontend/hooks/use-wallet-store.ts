'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WalletState {
	address: string | null;
	chainId: number | null;
	isConnected: boolean;
	isConnecting: boolean;
	error: string | null;
	lastActivity: number | null;
	connect: () => Promise<void>;
	disconnect: () => void;
	setAddress: (address: string | null) => void;
	setChainId: (chainId: number | null) => void;
	setError: (error: string | null) => void;
	updateLastActivity: () => void;
	checkInactivity: () => boolean;
	initializeFromStorage: (
		address: string | null,
		chainId: number | null
	) => void;
}

export const useWalletStore = create<WalletState>()(
	persist(
		(set, get) => ({
			address: null,
			chainId: null,
			isConnected: false,
			isConnecting: false,
			error: null,
			lastActivity: null,

			connect: async () => {
				set({ isConnecting: true, error: null });
				try {
					// This will be implemented with wagmi
					set({ isConnecting: false, lastActivity: Date.now() });
				} catch (error) {
					set({
						isConnecting: false,
						error:
							error instanceof Error
								? error.message
								: 'Failed to connect wallet',
					});
				}
			},

			disconnect: () => {
				set({
					address: null,
					chainId: null,
					isConnected: false,
					error: null,
					lastActivity: null,
				});
			},

			setAddress: (address) => {
				console.log('Setting wallet address in store:', address);
				set({ address, isConnected: !!address, lastActivity: Date.now() });
			},

			setChainId: (chainId) => {
				console.log('Setting chain ID in store:', chainId);
				set({ chainId, lastActivity: Date.now() });
			},

			setError: (error) => {
				set({ error, lastActivity: Date.now() });
			},

			updateLastActivity: () => {
				set({ lastActivity: Date.now() });
			},

			checkInactivity: () => {
				const { lastActivity } = get();
				if (!lastActivity) return false;

				// Check if 15 minutes have passed since last activity
				const inactiveTime = Date.now() - lastActivity;
				const isInactive = inactiveTime > 15 * 60 * 1000;

				if (isInactive) {
					get().disconnect();
				}

				return isInactive;
			},

			// New method to initialize state from storage without triggering render-time updates
			initializeFromStorage: (address, chainId) => {
				if (address) {
					set({
						address,
						chainId,
						isConnected: true,
						lastActivity: Date.now(),
					});
				}
			},
		}),
		{
			name: 'wallet-storage',
			partialize: (state) => ({
				address: state.address,
				chainId: state.chainId,
				isConnected: state.isConnected,
			}),
			// Use onRehydrateStorage to initialize state after hydration
			onRehydrateStorage: () => (state) => {
				// This runs after hydration is complete
				if (state) {
					const { address, chainId } = state;
					if (address) {
						// Use the new method to initialize state
						state.initializeFromStorage(address, chainId);
					}
				}
			},
		}
	)
);
