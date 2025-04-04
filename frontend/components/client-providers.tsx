'use client';

import { WalletContextProvider } from '@/hooks/use-wallet-context';
import { Toaster } from '@/components/ui/toaster';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';

// Create a client
const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<WalletContextProvider>
					{children}
					<Toaster />
				</WalletContextProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
