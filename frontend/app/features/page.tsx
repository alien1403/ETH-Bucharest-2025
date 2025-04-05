import Link from 'next/link';
import {
	ArrowRight,
	Lock,
	Shield,
	Wallet,
	Check,
	EyeOff,
	FileCheck,
	Users,
	Key,
	Fingerprint,
	Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FeaturesPage() {
	return (
		<>
			<main className='container mx-auto px-4 py-8 md:px-6'>
				{/* Hero Section */}
				<section className='py-12 md:py-16'>
					<div className='mx-auto max-w-3xl text-center'>
						<h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
							Platform{' '}
							<span className='bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
								Features
							</span>
						</h1>
						<p className='mt-6 text-xl text-slate-400'>
							Discover the powerful features that make ENVOTE the most secure
							and private voting platform available, designed to combat
							corruption in elections and create truly fair voting systems
							through fully homomorphic encryption.
						</p>
					</div>
				</section>

				{/* Feature Categories */}
				<section className='py-12'>
					<div className='mx-auto max-w-5xl'>
						<Tabs defaultValue='privacy' className='w-full'>
							<div className='flex justify-center'>
								<TabsList className='grid w-full max-w-md grid-cols-3 bg-slate-800/50'>
									<TabsTrigger
										value='privacy'
										className='data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400'
									>
										Privacy
									</TabsTrigger>
									<TabsTrigger
										value='security'
										className='data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400'
									>
										Security
									</TabsTrigger>
									<TabsTrigger
										value='usability'
										className='data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400'
									>
										Usability
									</TabsTrigger>
								</TabsList>
							</div>

							{/* Privacy Features */}
							<TabsContent value='privacy' className='mt-8'>
								<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<EyeOff className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												End-to-End Encryption
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Your vote is encrypted from the moment you cast it until
												the final tally
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Military-grade encryption algorithms</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>No one can see your individual vote</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Encrypted on your device before transmission
													</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<Shield className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Fully Homomorphic Encryption
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Compute on encrypted votes without ever decrypting
												individual ballots
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Perform calculations on encrypted data</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Eliminate opportunities for vote manipulation
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Prevent corruption in electoral processes</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<Fingerprint className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Anonymous Voting
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Vote without revealing your identity to anyone
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Decoupled identity verification and voting
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>No way to link votes to specific voters</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Privacy-preserving authentication</span>
												</li>
											</ul>
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							{/* Security Features */}
							<TabsContent value='security' className='mt-8'>
								<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400'>
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
											<CardTitle className='mt-4 text-white'>
												Tamper-Proof Ballot Box
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Blockchain-based storage ensures votes cannot be altered
												or deleted
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Immutable blockchain record of all votes</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Distributed ledger prevents single point of failure
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Cryptographic validation of vote integrity
													</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400'>
												<Key className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Threshold Cryptography
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Multiple parties must cooperate to decrypt the final
												results
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>No single entity can decrypt votes alone</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>M-of-N threshold scheme for decryption</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Prevents unauthorized access to voting data
													</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400'>
												<FileCheck className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Auditable Results
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Cryptographic proofs allow independent verification of
												results
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Public verification of vote tallying</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Mathematical proofs of correct execution</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Open-source code for transparency</span>
												</li>
											</ul>
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							{/* Usability Features */}
							<TabsContent value='usability' className='mt-8'>
								<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<Zap className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Simple Voting Interface
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Intuitive design makes voting easy for everyone
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Clean, modern user interface</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Mobile-responsive design</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Accessibility features for all users</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<Wallet className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Wallet Integration
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Seamless connection with popular blockchain wallets
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Support for multiple wallet providers</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>One-click authentication</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>No personal data stored on servers</span>
												</li>
											</ul>
										</CardContent>
									</Card>

									<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
										<CardHeader>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400'>
												<Users className='h-6 w-6' />
											</div>
											<CardTitle className='mt-4 text-white'>
												Customizable Polls
											</CardTitle>
											<CardDescription className='text-slate-400'>
												Create and manage various types of voting events
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>
														Multiple voting formats (yes/no, multiple choice)
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Configurable voting periods</span>
												</li>
												<li className='flex items-start gap-2'>
													<Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
													<span>Custom eligibility requirements</span>
												</li>
											</ul>
										</CardContent>
									</Card>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</section>

				{/* Feature Comparison */}
				<section className='py-12'>
					<div className='mx-auto max-w-5xl'>
						<h2 className='text-center text-3xl font-bold tracking-tight text-white'>
							Compare with Traditional Voting
						</h2>
						<p className='mt-4 text-center text-slate-400'>
							See how ENVOTE compares to traditional voting methods
						</p>

						<div className='mt-12 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
							<div className='overflow-x-auto'>
								<table className='w-full min-w-full'>
									<thead>
										<tr className='border-b border-slate-800 bg-slate-900/80'>
											<th className='px-6 py-4 text-left text-sm font-medium text-slate-300'>
												Feature
											</th>
											<th className='px-6 py-4 text-center text-sm font-medium text-purple-400'>
												ENVOTE
											</th>
											<th className='px-6 py-4 text-center text-sm font-medium text-slate-300'>
												Traditional Voting
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className='border-b border-slate-800'>
											<td className='px-6 py-4 text-sm text-white'>
												Privacy Protection
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Limited
											</td>
										</tr>
										<tr className='border-b border-slate-800 bg-slate-900/30'>
											<td className='px-6 py-4 text-sm text-white'>
												Tamper-Proof Records
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												No
											</td>
										</tr>
										<tr className='border-b border-slate-800'>
											<td className='px-6 py-4 text-sm text-white'>
												Independent Verification
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Limited
											</td>
										</tr>
										<tr className='border-b border-slate-800 bg-slate-900/30'>
											<td className='px-6 py-4 text-sm text-white'>
												Remote Participation
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Limited
											</td>
										</tr>
										<tr className='border-b border-slate-800'>
											<td className='px-6 py-4 text-sm text-white'>
												Cost Efficiency
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Expensive
											</td>
										</tr>
										<tr className='bg-slate-900/30'>
											<td className='px-6 py-4 text-sm text-white'>
												Real-time Results
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Delayed
											</td>
										</tr>
										<tr className='border-b border-slate-800'>
											<td className='px-6 py-4 text-sm text-white'>
												Election Integrity
											</td>
											<td className='px-6 py-4 text-center text-sm text-green-500'>
												<Check className='mx-auto h-5 w-5' />
											</td>
											<td className='px-6 py-4 text-center text-sm text-slate-400'>
												Vulnerable to Corruption
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-12'>
					<div className='mx-auto max-w-3xl rounded-lg border border-slate-800 bg-slate-900/50 p-8 shadow-lg backdrop-blur'>
						<div className='text-center'>
							<h2 className='text-2xl font-bold text-white'>
								Ready to experience secure voting?
							</h2>
							<p className='mt-4 text-slate-400'>
								Try our demo to see these features in action.
							</p>
							<div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
								<Link href='/demo'>
									<Button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'>
										Try Demo
										<ArrowRight className='ml-2 h-4 w-4' />
									</Button>
								</Link>
								<Link href='/faq'>
									<Button
										variant='outline'
										className='border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400'
									>
										View FAQ
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
