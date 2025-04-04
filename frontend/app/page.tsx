'use client';

import type React from 'react';
import Link from 'next/link';
import {
	ArrowRight,
	Check,
	Clock,
	Lock,
	Shield,
	Wallet,
	Building2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Home() {
	const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const section = document.getElementById('how-it-works');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			{/* Hero Section */}
			<section className='px-4 py-16 md:px-6 md:py-24 lg:py-32'>
				<div className='mx-auto max-w-3xl text-center'>
					<h1 className='bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl'>
						Confidential Voting Made Secure
					</h1>
					<p className='mt-4 text-xl text-slate-400'>
						A privacy-focused voting platform using fully homomorphic encryption
						(FHE) that ensures your vote remains confidential while maintaining
						transparency and verifiability. Designed to combat corruption in
						elections and create truly fair voting systems.
					</p>
					<div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
						<Link href='/votes'>
							<Button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'>
								Browse Votes
								<ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</Link>
						<a href='#how-it-works' onClick={scrollToHowItWorks}>
							<Button
								variant='outline'
								className='border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400'
							>
								Learn More
							</Button>
						</a>
					</div>
				</div>
			</section>

			{/* Demo Voting Interface */}
			<section className='px-4 py-16 md:px-6'>
				<div className='mx-auto max-w-4xl'>
					<h2 className='text-center text-3xl font-bold tracking-tight text-white'>
						Demo Voting Interface
					</h2>
					<p className='mt-4 text-center text-slate-400'>
						Experience how confidential voting works with our interactive demo
					</p>

					<Card className='mt-8 overflow-hidden border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
						<CardHeader className='border-b border-slate-800 bg-slate-900/80'>
							<div className='flex items-center justify-between'>
								<div>
									<CardTitle className='text-xl text-white'>
										Proposal #123: Upgrade Protocol
									</CardTitle>
									<CardDescription className='text-slate-400'>
										Vote on the proposed upgrade to the protocol
									</CardDescription>
								</div>
								<div className='flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300'>
									<Clock className='h-4 w-4 text-purple-400' />
									<span>Ends in 2 days</span>
								</div>
							</div>
						</CardHeader>
						<CardContent className='p-6'>
							<div className='space-y-6'>
								<div className='flex flex-col gap-4'>
									<div className='flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-800/50 p-4 transition-colors hover:border-purple-500/30 hover:bg-slate-800'>
										<div className='flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800'>
											<Check className='h-4 w-4 text-transparent' />
										</div>
										<div className='flex-1'>
											<h3 className='font-medium text-white'>Yes</h3>
											<p className='text-sm text-slate-400'>
												Support the protocol upgrade
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 transition-colors'>
										<div className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-purple-500 bg-purple-500/20'>
											<Check className='h-4 w-4 text-purple-500' />
										</div>
										<div className='flex-1'>
											<h3 className='font-medium text-white'>No</h3>
											<p className='text-sm text-slate-400'>
												Reject the protocol upgrade
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-800/50 p-4 transition-colors hover:border-purple-500/30 hover:bg-slate-800'>
										<div className='flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800'>
											<Check className='h-4 w-4 text-transparent' />
										</div>
										<div className='flex-1'>
											<h3 className='font-medium text-white'>Abstain</h3>
											<p className='text-sm text-slate-400'>
												Neither support nor reject
											</p>
										</div>
									</div>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h3 className='text-sm font-medium text-white'>
											Current Results
										</h3>
										<div className='flex items-center gap-1 text-sm text-slate-400'>
											<Lock className='h-4 w-4' />
											<span>Encrypted</span>
										</div>
									</div>
									<div className='space-y-2'>
										<div className='flex items-center gap-2'>
											<span className='w-10 text-sm text-white'>Yes</span>
											<div className='flex-1'>
												<Progress value={0} className='h-2 bg-slate-800' />
											</div>
											<span className='text-sm text-slate-400'>?%</span>
										</div>
										<div className='flex items-center gap-2'>
											<span className='w-10 text-sm text-white'>No</span>
											<div className='flex-1'>
												<Progress value={0} className='h-2 bg-slate-800' />
											</div>
											<span className='text-sm text-slate-400'>?%</span>
										</div>
										<div className='flex items-center gap-2'>
											<span className='w-10 text-sm text-white'>Abstain</span>
											<div className='flex-1'>
												<Progress value={0} className='h-2 bg-slate-800' />
											</div>
											<span className='text-sm text-slate-400'>?%</span>
										</div>
									</div>
									<p className='text-center text-sm text-slate-400'>
										Results will be revealed after voting ends
									</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className='border-t border-slate-800 bg-slate-900/80 p-4'>
							<Link href='/votes' className='w-full'>
								<Button className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'>
									Browse All Votes
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</section>

			{/* User Flow */}
			<section id='how-it-works' className='px-4 py-16 md:px-6 scroll-mt-16'>
				<div className='mx-auto max-w-4xl'>
					<h2 className='text-center text-3xl font-bold tracking-tight text-white'>
						How It Works
					</h2>
					<p className='mt-4 text-center text-slate-400'>
						A simple, secure process to cast your confidential vote
					</p>

					<div className='mt-12 grid gap-8 md:grid-cols-3'>
						<div className='flex flex-col items-center text-center'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
								<Wallet className='h-8 w-8' />
							</div>
							<h3 className='mt-4 text-xl font-bold text-white'>
								1. Verify Identity
							</h3>
							<p className='mt-2 text-slate-400'>
								Connect your wallet to verify your identity and eligibility to
								vote
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-blue-400'>
								<Check className='h-8 w-8' />
							</div>
							<h3 className='mt-4 text-xl font-bold text-white'>2. Vote</h3>
							<p className='mt-2 text-slate-400'>
								Cast your encrypted vote on the proposal with complete privacy
							</p>
						</div>
						<div className='flex flex-col items-center text-center'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
								<Shield className='h-8 w-8' />
							</div>
							<h3 className='mt-4 text-xl font-bold text-white'>3. Confirm</h3>
							<p className='mt-2 text-slate-400'>
								Receive confirmation of your vote without revealing your choice
							</p>
						</div>
					</div>

					<div className='mt-12 flex justify-center'>
						<Link href='/how-it-works'>
							<Button
								variant='outline'
								className='border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400'
							>
								Learn More About How It Works
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Confidentiality Features */}
			<section className='px-4 py-16 md:px-6'>
				<div className='mx-auto max-w-4xl'>
					<h2 className='text-center text-3xl font-bold tracking-tight text-white'>
						Confidentiality Features
					</h2>
					<p className='mt-4 text-center text-slate-400'>
						Advanced cryptographic techniques ensure your vote remains private
					</p>

					<div className='mt-12 grid gap-6 md:grid-cols-2'>
						<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
							<CardContent className='flex gap-4 p-6'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
									<Lock className='h-6 w-6' />
								</div>
								<div>
									<h3 className='text-lg font-bold text-white'>
										End-to-end Encrypted Votes
									</h3>
									<p className='mt-2 text-slate-400'>
										Your vote is encrypted from the moment you cast it until the
										final tally
									</p>
								</div>
							</CardContent>
						</Card>
						<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
							<CardContent className='flex gap-4 p-6'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400'>
									<Shield className='h-6 w-6' />
								</div>
								<div>
									<h3 className='text-lg font-bold text-white'>
										Fully Homomorphic Encryption
									</h3>
									<p className='mt-2 text-slate-400'>
										Compute on encrypted votes without ever decrypting
										individual ballots
									</p>
								</div>
							</CardContent>
						</Card>
						<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
							<CardContent className='flex gap-4 p-6'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='h-6 w-6'
									>
										<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' />
										<path d='m9 12 2 2 4-4' />
									</svg>
								</div>
								<div>
									<h3 className='text-lg font-bold text-white'>
										Tamper-proof Ballot Box
									</h3>
									<p className='mt-2 text-slate-400'>
										Blockchain-based storage ensures votes cannot be altered or
										deleted
									</p>
								</div>
							</CardContent>
						</Card>
						<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
							<CardContent className='flex gap-4 p-6'>
								<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='h-6 w-6'
									>
										<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' />
										<path d='M12 8v4' />
										<path d='M12 16h.01' />
									</svg>
								</div>
								<div>
									<h3 className='text-lg font-bold text-white'>
										Decentralized Governance
									</h3>
									<p className='mt-2 text-slate-400'>
										No single entity controls the voting process, ensuring
										fairness and transparency
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='mt-8 flex justify-center'>
						<Link href='/features'>
							<Button
								variant='outline'
								className='border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400'
							>
								Explore All Features
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
