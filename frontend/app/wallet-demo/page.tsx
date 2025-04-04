'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useWallet } from '@/hooks/use-wallet-context';
import { toast } from '@/hooks/use-toast';

export default function WalletDemoPage() {
	const {
		address,
		chainId,
		isConnected,
		isConnecting,
		error,
		connect,
		disconnect,
		isArbitrum,
		updateLastActivity,
	} = useWallet();

	const [transactionHash, setTransactionHash] = useState<string | null>(null);

	// Format address for display
	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	// Handle connect button click
	const handleConnect = async () => {
		try {
			updateLastActivity();
			await connect();
			toast({
				title: 'Wallet Connected',
				description: 'Your wallet has been successfully connected',
			});
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	};

	// Handle disconnect button click
	const handleDisconnect = async () => {
		try {
			updateLastActivity();
			await disconnect();
			toast({
				title: 'Wallet Disconnected',
				description: 'Your wallet has been disconnected',
			});
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	};

	// Mock transaction function
	const handleMockTransaction = () => {
		if (!isConnected) {
			toast({
				title: 'Wallet Not Connected',
				description: 'Please connect your wallet first',
				variant: 'destructive',
			});
			return;
		}

		if (!isArbitrum) {
			toast({
				title: 'Wrong Network',
				description: 'Please switch to Arbitrum One network',
				variant: 'destructive',
			});
			return;
		}

		// Simulate a transaction
		const mockHash = `0x${Math.random().toString(16).substring(2, 42)}`;
		setTransactionHash(mockHash);

		toast({
			title: 'Transaction Sent',
			description: 'Your transaction has been sent to the network',
		});
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Wallet Integration Demo</h1>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Wallet Status</CardTitle>
						<CardDescription>Current wallet connection status</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<div className='flex justify-between'>
								<span className='font-medium'>Connected:</span>
								<span
									className={isConnected ? 'text-green-500' : 'text-red-500'}
								>
									{isConnected ? 'Yes' : 'No'}
								</span>
							</div>

							{isConnected && address && (
								<>
									<div className='flex justify-between'>
										<span className='font-medium'>Address:</span>
										<span className='font-mono'>{formatAddress(address)}</span>
									</div>

									<div className='flex justify-between'>
										<span className='font-medium'>Chain ID:</span>
										<span>{chainId}</span>
									</div>

									<div className='flex justify-between'>
										<span className='font-medium'>Network:</span>
										<span
											className={isArbitrum ? 'text-green-500' : 'text-red-500'}
										>
											{isArbitrum ? 'Arbitrum One' : 'Wrong Network'}
										</span>
									</div>
								</>
							)}

							{error && (
								<div className='p-3 bg-red-900/50 text-red-300 rounded-md'>
									<p className='font-medium'>Error:</p>
									<p>{error}</p>
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter className='flex gap-2'>
						{isConnected ? (
							<Button
								variant='destructive'
								onClick={handleDisconnect}
								disabled={isConnecting}
							>
								Disconnect Wallet
							</Button>
						) : (
							<Button onClick={handleConnect} disabled={isConnecting}>
								{isConnecting ? 'Connecting...' : 'Connect Wallet'}
							</Button>
						)}
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Transaction Demo</CardTitle>
						<CardDescription>Test a mock transaction</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='mb-4'>
							This button will simulate a transaction on the Arbitrum network.
							Make sure your wallet is connected and you're on the Arbitrum One
							network.
						</p>

						{transactionHash && (
							<div className='p-3 bg-slate-800 rounded-md mb-4'>
								<p className='font-medium'>Transaction Hash:</p>
								<p className='font-mono text-sm break-all'>{transactionHash}</p>
								<a
									href={`https://arbiscan.io/tx/${transactionHash}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block'
								>
									View on Arbiscan
								</a>
							</div>
						)}
					</CardContent>
					<CardFooter>
						<Button
							onClick={handleMockTransaction}
							disabled={!isConnected || !isArbitrum}
							className='w-full'
						>
							Send Mock Transaction
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
