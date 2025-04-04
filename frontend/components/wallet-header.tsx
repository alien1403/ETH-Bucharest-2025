'use client';

import { useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet-context';
import { toast } from '@/hooks/use-toast';

export function WalletHeader() {
	const {
		address,
		isConnected,
		isConnecting,
		error,
		connect,
		disconnect,
		isArbitrum,
		updateLastActivity,
	} = useWallet();

	// Show error toast when there's an error
	useEffect(() => {
		if (error) {
			toast({
				title: 'Wallet Error',
				description: error,
				variant: 'destructive',
			});
		}
	}, [error]);

	// Show network warning when not on Arbitrum
	useEffect(() => {
		if (isConnected && !isArbitrum) {
			toast({
				title: 'Wrong Network',
				description: 'Please switch to Arbitrum One network to use this dapp',
				variant: 'destructive',
			});
		}
	}, [isConnected, isArbitrum]);

	// Format address for display
	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className='flex items-center gap-3'>
			{isConnected ? (
				<div className='flex items-center gap-2'>
					{address && (
						<div className='flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-300'>
							<Wallet className='h-4 w-4 text-purple-400' />
							<span className='font-mono'>{formatAddress(address)}</span>
							{!isArbitrum && (
								<span className='ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white'>
									Wrong Network
								</span>
							)}
						</div>
					)}
					<Button
						variant='ghost'
						size='sm'
						onClick={() => {
							updateLastActivity();
							disconnect();
						}}
						className='text-slate-300 hover:text-white'
					>
						Disconnect
					</Button>
				</div>
			) : (
				<Button
					variant='outline'
					size='sm'
					className='border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400'
					onClick={() => {
						updateLastActivity();
						connect();
					}}
					disabled={isConnecting}
				>
					{isConnecting ? 'Connecting...' : 'Connect Wallet'}
				</Button>
			)}
		</div>
	);
}
