'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	ArrowLeft,
	ChevronDown,
	Clock,
	Info,
	Lock,
	Shield,
	CheckCircle2,
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
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export default function VotePage() {
	const [voteState, setVoteState] = useState<
		'pre-vote' | 'post-vote' | 'results-hidden'
	>('pre-vote');
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

	const handleVote = () => {
		// In a real app, this would submit the vote to the blockchain
		setVoteState('post-vote');

		// After a delay, show the results-hidden state
		setTimeout(() => {
			setVoteState('results-hidden');
		}, 5000);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50'>
			<main className='container mx-auto px-4 py-8 md:px-6'>
				<div className='mx-auto max-w-3xl'>
					{/* Back Link */}
					<div className='mb-6'>
						<Link
							href='/'
							className='flex items-center gap-2 text-slate-300 hover:text-white'
						>
							<ArrowLeft className='h-4 w-4' />
							<span>Back to Home</span>
						</Link>
					</div>

					{/* Voting Header */}
					<div className='mb-8'>
						<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
							<h1 className='text-2xl font-bold sm:text-3xl text-white'>
								Proposal #42: Treasury Allocation
							</h1>
							<Badge className='w-fit bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400'>
								Active
							</Badge>
						</div>

						<div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
							<p className='text-slate-400'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
								auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
								eget ultricies nisl nisl eget nisl.
							</p>

							<div className='flex items-center gap-2 whitespace-nowrap rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-300'>
								<Clock className='h-4 w-4 text-purple-400' />
								<span>Ends in 2d 14h</span>
							</div>
						</div>
					</div>

					{/* Confidential Voting Card */}
					<Card className='overflow-hidden border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
						<CardHeader className='border-b border-slate-800 bg-slate-900/80 pb-4'>
							<CardTitle className='text-xl text-white'>
								Cast Your Vote
							</CardTitle>
							<CardDescription className='flex items-center gap-1.5 text-slate-400'>
								<Lock className='h-4 w-4 text-purple-400' />
								Your vote is encrypted and confidential
							</CardDescription>
						</CardHeader>

						<CardContent className='p-6'>
							{voteState === 'pre-vote' && (
								<RadioGroup
									value={selectedOption || ''}
									onValueChange={setSelectedOption}
									className='space-y-4'
								>
									<div
										className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
											selectedOption === 'yes'
												? 'border-purple-500/50 bg-purple-500/10'
												: 'border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800'
										}`}
										onClick={() => setSelectedOption('yes')}
									>
										<RadioGroupItem
											value='yes'
											id='yes'
											className='border-slate-600 text-purple-500'
										/>
										<div className='flex-1'>
											<Label
												htmlFor='yes'
												className='text-lg font-medium cursor-pointer text-white'
											>
												Yes
											</Label>
											<p className='mt-1 text-sm text-slate-400'>
												Approve the treasury allocation as proposed
											</p>
										</div>
									</div>

									<div
										className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
											selectedOption === 'no'
												? 'border-purple-500/50 bg-purple-500/10'
												: 'border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800'
										}`}
										onClick={() => setSelectedOption('no')}
									>
										<RadioGroupItem
											value='no'
											id='no'
											className='border-slate-600 text-purple-500'
										/>
										<div className='flex-1'>
											<Label
												htmlFor='no'
												className='text-lg font-medium cursor-pointer text-white'
											>
												No
											</Label>
											<p className='mt-1 text-sm text-slate-400'>
												Reject the treasury allocation proposal
											</p>
										</div>
									</div>

									<div
										className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
											selectedOption === 'abstain'
												? 'border-purple-500/50 bg-purple-500/10'
												: 'border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800'
										}`}
										onClick={() => setSelectedOption('abstain')}
									>
										<RadioGroupItem
											value='abstain'
											id='abstain'
											className='border-slate-600 text-purple-500'
										/>
										<div className='flex-1'>
											<Label
												htmlFor='abstain'
												className='text-lg font-medium cursor-pointer text-white'
											>
												Abstain
											</Label>
											<p className='mt-1 text-sm text-slate-400'>
												Neither approve nor reject the proposal
											</p>
										</div>
									</div>
								</RadioGroup>
							)}

							{voteState === 'post-vote' && (
								<div className='flex flex-col items-center justify-center py-8 text-center'>
									<div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20'>
										<CheckCircle2 className='h-8 w-8 text-green-500' />
									</div>
									<h3 className='text-xl font-bold text-white'>
										Vote Recorded!
									</h3>
									<p className='mt-2 text-slate-400'>
										Your vote has been encrypted and recorded. Results will be
										revealed on November 30, 2023.
									</p>
								</div>
							)}

							{voteState === 'results-hidden' && (
								<div className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h3 className='text-lg font-medium text-white'>
											Current Results
										</h3>
										<div className='flex items-center gap-1.5 text-sm text-slate-400'>
											<Lock className='h-4 w-4' />
											<span>Encrypted until voting ends</span>
										</div>
									</div>

									<div className='space-y-4'>
										<div className='space-y-2'>
											<div className='flex items-center justify-between'>
												<span className='text-white'>Yes</span>
												<span className='text-slate-400'>?%</span>
											</div>
											<div className='h-2 w-full rounded-full bg-slate-800 p-[1px]'>
												<div className='h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500'></div>
											</div>
										</div>

										<div className='space-y-2'>
											<div className='flex items-center justify-between'>
												<span className='text-white'>No</span>
												<span className='text-slate-400'>?%</span>
											</div>
											<div className='h-2 w-full rounded-full bg-slate-800 p-[1px]'>
												<div className='h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500'></div>
											</div>
										</div>

										<div className='space-y-2'>
											<div className='flex items-center justify-between'>
												<span className='text-white'>Abstain</span>
												<span className='text-slate-400'>?%</span>
											</div>
											<div className='h-2 w-full rounded-full bg-slate-800 p-[1px]'>
												<div className='h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500'></div>
											</div>
										</div>
									</div>

									<div className='flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center text-sm text-slate-400'>
										<Lock className='h-4 w-4' />
										<span>Results will unlock after voting ends</span>
									</div>
								</div>
							)}
						</CardContent>

						<CardFooter className='border-t border-slate-800 bg-slate-900/80 p-4'>
							{voteState === 'pre-vote' && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className='w-full'>
												<Button
													className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
													disabled={!selectedOption}
													onClick={handleVote}
												>
													Submit Vote
												</Button>
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												{selectedOption
													? 'Submit your vote'
													: 'Select an option to vote'}
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}

							{voteState === 'post-vote' && (
								<Button
									variant='outline'
									className='w-full border-green-500/30 text-green-400 hover:bg-green-500/10'
									disabled
								>
									Vote Submitted
								</Button>
							)}

							{voteState === 'results-hidden' && (
								<Button
									variant='outline'
									className='w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
									disabled
								>
									Results Locked
								</Button>
							)}
						</CardFooter>
					</Card>

					{/* How It Works Section */}
					<div className='mt-8'>
						<Collapsible
							open={isHowItWorksOpen}
							onOpenChange={setIsHowItWorksOpen}
						>
							<CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-left'>
								<div className='flex items-center gap-2'>
									<Info className='h-5 w-5 text-purple-400' />
									<span className='font-medium text-white'>
										How Confidential Voting Works
									</span>
								</div>
								<ChevronDown
									className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
										isHowItWorksOpen ? 'rotate-180' : ''
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent className='mt-2 rounded-lg border border-slate-800 bg-slate-900/50 p-4'>
								<div className='space-y-4'>
									<div className='flex items-start gap-3'>
										<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
											<span className='font-bold'>1</span>
										</div>
										<div>
											<h3 className='font-bold text-white'>
												Your Vote is Encrypted
											</h3>
											<p className='text-slate-400'>
												When you cast your vote, it's encrypted using fully
												homomorphic encryption before it leaves your device.
											</p>
										</div>
									</div>
									<div className='flex items-start gap-3'>
										<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
											<span className='font-bold'>2</span>
										</div>
										<div>
											<h3 className='font-bold text-white'>
												Secure Blockchain Recording
											</h3>
											<p className='text-slate-400'>
												Your encrypted vote is recorded on the blockchain,
												ensuring it cannot be altered or deleted.
											</p>
										</div>
									</div>
									<div className='flex items-start gap-3'>
										<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
											<span className='font-bold'>3</span>
										</div>
										<div>
											<h3 className='font-bold text-white'>
												Results Remain Private
											</h3>
											<p className='text-slate-400'>
												All votes remain encrypted until the voting period ends,
												preventing early results from influencing voters.
											</p>
										</div>
									</div>
									<div className='flex items-start gap-3'>
										<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400'>
											<span className='font-bold'>4</span>
										</div>
										<div>
											<h3 className='font-bold text-white'>
												Verifiable Results
											</h3>
											<p className='text-slate-400'>
												After voting ends, results are tallied while remaining
												encrypted, and you can verify your vote was counted
												correctly.
											</p>
										</div>
									</div>
								</div>
							</CollapsibleContent>
						</Collapsible>
					</div>
				</div>
			</main>
		</div>
	);
}
