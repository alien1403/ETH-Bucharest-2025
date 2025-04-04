// 'use client';

// import type React from 'react';

// import { useState, useEffect, useRef } from 'react';
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Calendar } from '@/components/ui/calendar';
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from '@/components/ui/popover';
// import { format } from 'date-fns';
// import {
// 	CalendarIcon,
// 	CheckCircle2,
// 	Info,
// 	Plus,
// 	Trash2,
// 	Vote,
// 	X,
// 	AlertCircle,
// } from 'lucide-react';
// import Link from 'next/link';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useWallet } from '@/hooks/use-wallet-context';
// import { useCreateCampaign } from '@/lib/contract';

// // Default form data
// const defaultFormData = {
// 	title: '',
// 	description: '',
// 	category: '',
// 	startDate: null as Date | null,
// 	endDate: null as Date | null,
// 	options: [
// 		{ id: '1', label: 'Yes', description: 'Approve the proposal' },
// 		{ id: '2', label: 'No', description: 'Reject the proposal' },
// 		{ id: '3', label: 'Abstain', description: 'Neither approve nor reject' },
// 	],
// 	content: '',
// 	eligibleWallets: [] as string[],
// };

// export default function CreateVotePage() {
// 	const [formData, setFormData] = useState(defaultFormData);
// 	const [step, setStep] = useState(1);
// 	const [isSubmitted, setIsSubmitted] = useState(false);
// 	const [newWallet, setNewWallet] = useState('');
// 	const [walletError, setWalletError] = useState('');
// 	const [csvError, setCsvError] = useState('');
// 	const [isUploading, setIsUploading] = useState(false);
// 	const [isCreating, setIsCreating] = useState(false);
// 	const [creationError, setCreationError] = useState<string | null>(null);
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	// Get wallet context
// 	const { address, isConnected } = useWallet();

// 	// Get contract functions
// 	const {
// 		createCampaign,
// 		isLoading: isContractLoading,
// 		isError: isContractError,
// 		isSuccess: isContractSuccess,
// 	} = useCreateCampaign();

// 	// Load any saved draft from local storage
// 	useEffect(() => {
// 		const savedVoteData = localStorage.getItem('draftVote');
// 		if (savedVoteData) {
// 			try {
// 				const parsedData = JSON.parse(savedVoteData);
// 				// Convert string dates back to Date objects
// 				if (parsedData.startDate)
// 					parsedData.startDate = new Date(parsedData.startDate);
// 				if (parsedData.endDate)
// 					parsedData.endDate = new Date(parsedData.endDate);
// 				setFormData(parsedData);
// 			} catch (error) {
// 				console.error('Failed to parse vote data from localStorage:', error);
// 			}
// 		}
// 	}, []);

// 	// Save draft to local storage whenever form data changes
// 	useEffect(() => {
// 		localStorage.setItem('draftVote', JSON.stringify(formData));
// 	}, [formData]);

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleCategoryChange = (value: string) => {
// 		setFormData((prev) => ({ ...prev, category: value }));
// 	};

// 	const handleStartDateChange = (date: Date | undefined) => {
// 		setFormData((prev) => ({ ...prev, startDate: date || null }));
// 	};

// 	const handleEndDateChange = (date: Date | undefined) => {
// 		setFormData((prev) => ({ ...prev, endDate: date || null }));
// 	};

// 	const handleOptionChange = (id: string, field: string, value: string) => {
// 		setFormData((prev) => ({
// 			...prev,
// 			options: prev.options.map((option) =>
// 				option.id === id ? { ...option, [field]: value } : option
// 			),
// 		}));
// 	};

// 	const addOption = () => {
// 		const newId = (formData.options.length + 1).toString();
// 		setFormData((prev) => ({
// 			...prev,
// 			options: [...prev.options, { id: newId, label: '', description: '' }],
// 		}));
// 	};

// 	const removeOption = (id: string) => {
// 		if (formData.options.length <= 2) {
// 			alert('You must have at least 2 options');
// 			return;
// 		}

// 		setFormData((prev) => ({
// 			...prev,
// 			options: prev.options.filter((option) => option.id !== id),
// 		}));
// 	};

// 	const handleNextStep = () => {
// 		setStep((prev) => prev + 1);
// 	};

// 	const handlePrevStep = () => {
// 		setStep((prev) => prev - 1);
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (!isConnected || !address) {
// 			setCreationError('Please connect your wallet to create a vote');
// 			return;
// 		}

// 		setIsCreating(true);
// 		setCreationError(null);

// 		try {
// 			// Convert dates to timestamps
// 			const startTimestamp = formData.startDate
// 				? Math.floor(formData.startDate.getTime() / 1000)
// 				: 0;
// 			const endTimestamp = formData.endDate
// 				? Math.floor(formData.endDate.getTime() / 1000)
// 				: 0;

// 			// Prepare campaign data
// 			const campaignData = {
// 				description: formData.description,
// 				startTime: BigInt(startTimestamp),
// 				endTime: BigInt(endTimestamp),
// 				optionCount: BigInt(formData.options.length),
// 				publicKey:
// 					'0x0000000000000000000000000000000000000000000000000000000000000000', // Placeholder
// 			};

// 			// Call the contract to create the campaign
// 			await createCampaign(campaignData);

// 			// Get entity data for the creator info
// 			const entityData = JSON.parse(localStorage.getItem('entityData') || '{}');

// 			// Save the completed vote to local storage
// 			const createdVotes = JSON.parse(
// 				localStorage.getItem('createdVotes') || '[]'
// 			);
// 			const newVote = {
// 				...formData,
// 				id: (createdVotes.length + 1).toString(),
// 				status: 'active',
// 				createdAt: new Date().toISOString(),
// 				participation: 0,
// 				totalVotes: 0,
// 				creator: {
// 					name: entityData.name || 'Governance DAO',
// 					type: entityData.type || 'DAO',
// 					id: 'creator-1',
// 				},
// 				results: {
// 					yes: 0,
// 					no: 0,
// 					abstain: 0,
// 				},
// 				transactionHash: 'pending', // We don't have access to the transaction hash
// 			};

// 			createdVotes.push(newVote);
// 			localStorage.setItem('createdVotes', JSON.stringify(createdVotes));

// 			// Clear the draft
// 			localStorage.removeItem('draftVote');

// 			// Update entity stats
// 			if (entityData.votesCreated) {
// 				entityData.votesCreated += 1;
// 			} else {
// 				entityData.votesCreated = 1;
// 			}
// 			localStorage.setItem('entityData', JSON.stringify(entityData));

// 			setIsSubmitted(true);
// 		} catch (error) {
// 			console.error('Error creating campaign:', error);
// 			setCreationError(
// 				error instanceof Error ? error.message : 'Failed to create campaign'
// 			);
// 		} finally {
// 			setIsCreating(false);
// 		}
// 	};

// 	const addWallet = () => {
// 		// Basic validation for Ethereum address format
// 		if (!newWallet) {
// 			setWalletError('Please enter a wallet address');
// 			return;
// 		}

// 		if (!/^0x[a-fA-F0-9]{40}$/.test(newWallet)) {
// 			setWalletError('Please enter a valid Ethereum address (0x...)');
// 			return;
// 		}

// 		if (formData.eligibleWallets.includes(newWallet)) {
// 			setWalletError('This wallet is already in the list');
// 			return;
// 		}

// 		setFormData((prev) => ({
// 			...prev,
// 			eligibleWallets: [...prev.eligibleWallets, newWallet],
// 		}));

// 		setNewWallet('');
// 		setWalletError('');
// 	};

// 	const removeWallet = (wallet: string) => {
// 		setFormData((prev) => ({
// 			...prev,
// 			eligibleWallets: prev.eligibleWallets.filter((w) => w !== wallet),
// 		}));
// 	};

// 	const isStep1Valid =
// 		formData.title && formData.description && formData.category;
// 	const isStep2Valid =
// 		formData.startDate &&
// 		formData.endDate &&
// 		formData.options.every((option) => option.label) &&
// 		formData.options.length >= 2;
// 	const isStep3Valid =
// 		formData.content.length > 0 && formData.eligibleWallets.length > 0;

// 	const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0];
// 		if (!file) return;

// 		setIsUploading(true);
// 		setCsvError('');

// 		const reader = new FileReader();

// 		reader.onload = (event) => {
// 			try {
// 				const content = event.target?.result as string;
// 				const lines = content.split(/\r\n|\n/).filter((line) => line.trim());

// 				// Validate addresses
// 				const validAddresses: string[] = [];
// 				const invalidAddresses: string[] = [];

// 				lines.forEach((line) => {
// 					const address = line.trim();
// 					if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
// 						if (
// 							!formData.eligibleWallets.includes(address) &&
// 							!validAddresses.includes(address)
// 						) {
// 							validAddresses.push(address);
// 						}
// 					} else {
// 						invalidAddresses.push(address);
// 					}
// 				});

// 				if (invalidAddresses.length > 0) {
// 					setCsvError(
// 						`Found ${invalidAddresses.length} invalid addresses. Please ensure all addresses are in the format 0x... (42 characters)`
// 					);
// 				}

// 				if (validAddresses.length > 0) {
// 					setFormData((prev) => ({
// 						...prev,
// 						eligibleWallets: [...prev.eligibleWallets, ...validAddresses],
// 					}));
// 				}

// 				setIsUploading(false);
// 				// Reset file input
// 				if (fileInputRef.current) {
// 					fileInputRef.current.value = '';
// 				}
// 			} catch (error) {
// 				setCsvError(
// 					'Failed to parse CSV file. Please ensure it contains one Ethereum address per line.'
// 				);
// 				setIsUploading(false);
// 			}
// 		};

// 		reader.onerror = () => {
// 			setCsvError('Failed to read the file. Please try again.');
// 			setIsUploading(false);
// 		};

// 		reader.readAsText(file);
// 	};

// 	return (
// 		<>
// 			<div className='container mx-auto py-8 px-4'>
// 				<h1 className='text-3xl font-bold text-white mb-6'>
// 					Create a New Vote
// 				</h1>

// 				{!isSubmitted ? (
// 					<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
// 						<CardHeader>
// 							<div className='flex items-center justify-between'>
// 								<div>
// 									<CardTitle className='text-xl text-white'>
// 										New Vote Proposal
// 									</CardTitle>
// 									<CardDescription className='text-slate-400'>
// 										Create a new vote for your community
// 									</CardDescription>
// 								</div>
// 								<div className='flex items-center gap-2'>
// 									<span
// 										className={`w-3 h-3 rounded-full ${
// 											step >= 1 ? 'bg-purple-500' : 'bg-slate-700'
// 										}`}
// 									></span>
// 									<span
// 										className={`w-3 h-3 rounded-full ${
// 											step >= 2 ? 'bg-purple-500' : 'bg-slate-700'
// 										}`}
// 									></span>
// 									<span
// 										className={`w-3 h-3 rounded-full ${
// 											step >= 3 ? 'bg-purple-500' : 'bg-slate-700'
// 										}`}
// 									></span>
// 								</div>
// 							</div>
// 						</CardHeader>
// 						<CardContent>
// 							{step === 1 && (
// 								<div className='space-y-4'>
// 									<div className='space-y-2'>
// 										<Label htmlFor='title' className='text-white'>
// 											Vote Title
// 										</Label>
// 										<Input
// 											id='title'
// 											name='title'
// 											value={formData.title}
// 											onChange={handleInputChange}
// 											className='bg-slate-800 border-slate-700 text-white'
// 											placeholder='e.g., Protocol Upgrade Proposal'
// 											required
// 										/>
// 									</div>

// 									<div className='space-y-2'>
// 										<Label htmlFor='description' className='text-white'>
// 											Short Description
// 										</Label>
// 										<Textarea
// 											id='description'
// 											name='description'
// 											value={formData.description}
// 											onChange={handleInputChange}
// 											className='bg-slate-800 border-slate-700 text-white'
// 											placeholder='A brief summary of what this vote is about'
// 											required
// 										/>
// 										<p className='text-xs text-slate-400'>
// 											This will appear in the vote listing
// 										</p>
// 									</div>

// 									<div className='space-y-2'>
// 										<Label htmlFor='category' className='text-white'>
// 											Category
// 										</Label>
// 										<Select
// 											value={formData.category}
// 											onValueChange={handleCategoryChange}
// 										>
// 											<SelectTrigger className='bg-slate-800 border-slate-700 text-white'>
// 												<SelectValue placeholder='Select a category' />
// 											</SelectTrigger>
// 											<SelectContent className='bg-slate-900 border-slate-700 text-white'>
// 												<SelectItem value='protocol'>Protocol</SelectItem>
// 												<SelectItem value='treasury'>Treasury</SelectItem>
// 												<SelectItem value='governance'>Governance</SelectItem>
// 												<SelectItem value='community'>Community</SelectItem>
// 												<SelectItem value='other'>Other</SelectItem>
// 											</SelectContent>
// 										</Select>
// 									</div>
// 								</div>
// 							)}

// 							{step === 2 && (
// 								<div className='space-y-4'>
// 									<div className='grid gap-4 md:grid-cols-2'>
// 										<div className='space-y-2'>
// 											<Label className='text-white'>Start Date</Label>
// 											<Popover>
// 												<PopoverTrigger asChild>
// 													<Button
// 														variant='outline'
// 														className='w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
// 													>
// 														<CalendarIcon className='mr-2 h-4 w-4' />
// 														{formData.startDate ? (
// 															format(formData.startDate, 'PPP')
// 														) : (
// 															<span>Pick a date</span>
// 														)}
// 													</Button>
// 												</PopoverTrigger>
// 												<PopoverContent className='w-auto p-0 bg-slate-900 border-slate-700'>
// 													<Calendar
// 														mode='single'
// 														selected={formData.startDate || undefined}
// 														onSelect={handleStartDateChange}
// 														initialFocus
// 														className='bg-slate-900 text-white'
// 													/>
// 												</PopoverContent>
// 											</Popover>
// 										</div>

// 										<div className='space-y-2'>
// 											<Label className='text-white'>End Date</Label>
// 											<Popover>
// 												<PopoverTrigger asChild>
// 													<Button
// 														variant='outline'
// 														className='w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
// 													>
// 														<CalendarIcon className='mr-2 h-4 w-4' />
// 														{formData.endDate ? (
// 															format(formData.endDate, 'PPP')
// 														) : (
// 															<span>Pick a date</span>
// 														)}
// 													</Button>
// 												</PopoverTrigger>
// 												<PopoverContent className='w-auto p-0 bg-slate-900 border-slate-700'>
// 													<Calendar
// 														mode='single'
// 														selected={formData.endDate || undefined}
// 														onSelect={handleEndDateChange}
// 														initialFocus
// 														className='bg-slate-900 text-white'
// 														disabled={(date) =>
// 															(formData.startDate
// 																? date < formData.startDate
// 																: false) || date < new Date()
// 														}
// 													/>
// 												</PopoverContent>
// 											</Popover>
// 										</div>
// 									</div>

// 									<div className='space-y-2'>
// 										<div className='flex items-center justify-between'>
// 											<Label className='text-white'>Voting Options</Label>
// 											<Button
// 												variant='outline'
// 												size='sm'
// 												className='h-8 border-slate-700 text-slate-400 hover:bg-slate-800'
// 												onClick={addOption}
// 											>
// 												<Plus className='h-3.5 w-3.5 mr-1' />
// 												Add Option
// 											</Button>
// 										</div>

// 										<div className='space-y-3'>
// 											{formData.options.map((option) => (
// 												<div
// 													key={option.id}
// 													className='grid gap-2 md:grid-cols-5 items-start'
// 												>
// 													<div className='md:col-span-2'>
// 														<Input
// 															value={option.label}
// 															onChange={(e) =>
// 																handleOptionChange(
// 																	option.id,
// 																	'label',
// 																	e.target.value
// 																)
// 															}
// 															className='bg-slate-800 border-slate-700 text-white'
// 															placeholder='Option label'
// 														/>
// 													</div>
// 													<div className='md:col-span-2'>
// 														<Input
// 															value={option.description}
// 															onChange={(e) =>
// 																handleOptionChange(
// 																	option.id,
// 																	'description',
// 																	e.target.value
// 																)
// 															}
// 															className='bg-slate-800 border-slate-700 text-white'
// 															placeholder='Option description'
// 														/>
// 													</div>
// 													<div>
// 														<Button
// 															variant='ghost'
// 															size='sm'
// 															className='h-10 w-10 p-0 text-slate-400 hover:bg-red-900/20 hover:text-red-400'
// 															onClick={() => removeOption(option.id)}
// 														>
// 															<Trash2 className='h-4 w-4' />
// 														</Button>
// 													</div>
// 												</div>
// 											))}
// 										</div>
// 									</div>
// 								</div>
// 							)}

// 							{step === 3 && (
// 								<div className='space-y-4'>
// 									<div className='space-y-2'>
// 										<Label htmlFor='content' className='text-white'>
// 											Detailed Proposal
// 										</Label>
// 										<Tabs defaultValue='write' className='w-full'>
// 											<TabsList className='grid w-full grid-cols-2 bg-slate-800/50'>
// 												<TabsTrigger
// 													value='write'
// 													className='data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400'
// 												>
// 													Write
// 												</TabsTrigger>
// 												<TabsTrigger
// 													value='preview'
// 													className='data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400'
// 												>
// 													Preview
// 												</TabsTrigger>
// 											</TabsList>
// 											<TabsContent value='write'>
// 												<Textarea
// 													id='content'
// 													name='content'
// 													value={formData.content}
// 													onChange={handleInputChange}
// 													className='bg-slate-800 border-slate-700 text-white min-h-[200px]'
// 													placeholder='Provide a detailed description of your proposal. You can use HTML for formatting.'
// 													required
// 												/>
// 											</TabsContent>
// 											<TabsContent value='preview'>
// 												<div className='min-h-[200px] p-4 rounded-md border border-slate-700 bg-slate-800'>
// 													{formData.content ? (
// 														<div
// 															className='prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400'
// 															dangerouslySetInnerHTML={{
// 																__html: formData.content,
// 															}}
// 														/>
// 													) : (
// 														<p className='text-slate-500 italic'>
// 															Nothing to preview yet...
// 														</p>
// 													)}
// 												</div>
// 											</TabsContent>
// 										</Tabs>
// 										<p className='text-xs text-slate-400'>
// 											You can use HTML tags like &lt;h3&gt;, &lt;p&gt;,
// 											&lt;ul&gt;, &lt;li&gt; for formatting
// 										</p>
// 									</div>

// 									<div className='space-y-2'>
// 										<Label className='text-white'>Eligible Wallets</Label>
// 										<p className='text-sm text-slate-400 mb-2'>
// 											Add wallet addresses that will be eligible to vote on this
// 											proposal
// 										</p>

// 										<div className='flex gap-2'>
// 											<Input
// 												value={newWallet}
// 												onChange={(e) => setNewWallet(e.target.value)}
// 												className='bg-slate-800 border-slate-700 text-white flex-grow'
// 												placeholder='0x...'
// 											/>
// 											<Button
// 												variant='outline'
// 												className='border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400'
// 												onClick={addWallet}
// 											>
// 												Add
// 											</Button>
// 										</div>

// 										{walletError && (
// 											<p className='text-sm text-red-400 mt-1'>{walletError}</p>
// 										)}

// 										<div className='mt-4 flex flex-col gap-3'>
// 											<div className='flex flex-col sm:flex-row gap-2'>
// 												<div className='relative flex-grow'>
// 													<input
// 														type='file'
// 														accept='.csv,.txt'
// 														onChange={handleCsvUpload}
// 														ref={fileInputRef}
// 														className='absolute inset-0 opacity-0 cursor-pointer z-10'
// 														disabled={isUploading}
// 													/>
// 													<Button
// 														variant='outline'
// 														className='w-full border-slate-700 text-slate-400 hover:bg-slate-800'
// 														disabled={isUploading}
// 													>
// 														{isUploading
// 															? 'Uploading...'
// 															: 'Upload CSV/TXT File'}
// 													</Button>
// 												</div>
// 												<Button
// 													variant='outline'
// 													size='sm'
// 													className='text-xs border-slate-700 text-slate-400 hover:bg-slate-800'
// 													onClick={() => {
// 														// Add some example wallets for testing
// 														const exampleWallets = [
// 															'0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
// 															'0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
// 															'0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
// 														];

// 														setFormData((prev) => ({
// 															...prev,
// 															eligibleWallets: [
// 																...prev.eligibleWallets,
// 																...exampleWallets,
// 															],
// 														}));
// 													}}
// 												>
// 													Add Example Wallets
// 												</Button>
// 											</div>

// 											{csvError && (
// 												<Alert
// 													variant='destructive'
// 													className='bg-red-900/20 text-red-400 border-red-900'
// 												>
// 													<AlertCircle className='h-4 w-4' />
// 													<AlertDescription>{csvError}</AlertDescription>
// 												</Alert>
// 											)}

// 											<div className='text-xs text-slate-400'>
// 												Upload a CSV or TXT file with one Ethereum address per
// 												line (0x...)
// 											</div>
// 										</div>

// 										<div className='mt-4 space-y-2'>
// 											{formData.eligibleWallets.length > 0 ? (
// 												<div className='rounded-lg border border-slate-800 bg-slate-800/30 p-4'>
// 													<div className='flex items-center justify-between mb-2'>
// 														<h4 className='text-sm font-medium text-white'>
// 															Eligible Wallets (
// 															{formData.eligibleWallets.length})
// 														</h4>
// 														{formData.eligibleWallets.length > 0 && (
// 															<Button
// 																variant='outline'
// 																size='sm'
// 																className='h-7 px-2 text-xs border-red-500/30 text-red-400 hover:bg-red-900/20'
// 																onClick={() =>
// 																	setFormData((prev) => ({
// 																		...prev,
// 																		eligibleWallets: [],
// 																	}))
// 																}
// 															>
// 																Clear All
// 															</Button>
// 														)}
// 													</div>
// 													<div className='space-y-2 max-h-[200px] overflow-y-auto'>
// 														{formData.eligibleWallets.map((wallet, index) => (
// 															<div
// 																key={index}
// 																className='flex items-center justify-between bg-slate-800 rounded-md p-2'
// 															>
// 																<span className='text-sm text-slate-300 font-mono truncate'>
// 																	{wallet}
// 																</span>
// 																<Button
// 																	variant='ghost'
// 																	size='sm'
// 																	className='h-6 w-6 p-0 text-slate-400 hover:bg-red-900/20 hover:text-red-400'
// 																	onClick={() => removeWallet(wallet)}
// 																>
// 																	<X className='h-4 w-4' />
// 																</Button>
// 															</div>
// 														))}
// 													</div>
// 												</div>
// 											) : (
// 												<div className='rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center'>
// 													<p className='text-sm text-slate-400'>
// 														No eligible wallets added yet
// 													</p>
// 												</div>
// 											)}
// 										</div>
// 									</div>

// 									<div className='rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm'>
// 										<div className='flex gap-2'>
// 											<Info className='h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5' />
// 											<div className='text-slate-300'>
// 												<p>Before submitting your vote proposal:</p>
// 												<ul className='list-disc pl-5 mt-2 space-y-1 text-slate-400'>
// 													<li>Ensure all information is accurate and clear</li>
// 													<li>
// 														Make sure you've added all eligible wallet addresses
// 													</li>
// 													<li>
// 														Only wallets on the eligibility list will be able to
// 														vote
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							)}
// 						</CardContent>
// 						<CardFooter>
// 							{step === 1 ? (
// 								<Button
// 									className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
// 									onClick={handleNextStep}
// 									disabled={!isStep1Valid}
// 								>
// 									Continue
// 								</Button>
// 							) : step === 2 ? (
// 								<div className='flex w-full gap-4'>
// 									<Button
// 										variant='outline'
// 										className='flex-1 border-slate-700 text-slate-400 hover:bg-slate-800'
// 										onClick={handlePrevStep}
// 									>
// 										Back
// 									</Button>
// 									<Button
// 										className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
// 										onClick={handleNextStep}
// 										disabled={!isStep2Valid}
// 									>
// 										Continue
// 									</Button>
// 								</div>
// 							) : (
// 								<div className='flex w-full gap-4'>
// 									<Button
// 										variant='outline'
// 										className='flex-1 border-slate-700 text-slate-400 hover:bg-slate-800'
// 										onClick={handlePrevStep}
// 									>
// 										Back
// 									</Button>
// 									<Button
// 										className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
// 										onClick={handleSubmit}
// 										disabled={!isStep3Valid}
// 									>
// 										{isCreating || isContractLoading ? (
// 											<>Creating Campaign...</>
// 										) : (
// 											<>Create Vote</>
// 										)}
// 									</Button>
// 								</div>
// 							)}
// 						</CardFooter>
// 					</Card>
// 				) : (
// 					<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
// 						<CardContent className='pt-6 pb-6 flex flex-col items-center text-center'>
// 							<div className='w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4'>
// 								<CheckCircle2 className='h-8 w-8 text-green-500' />
// 							</div>
// 							<h2 className='text-2xl font-bold text-white mb-2'>
// 								Vote Created Successfully!
// 							</h2>
// 							<p className='text-slate-400 mb-6'>
// 								Your vote proposal has been created and is now available for
// 								eligible wallets to vote.
// 							</p>
// 							<div className='flex flex-col sm:flex-row gap-4'>
// 								<Link href='/votes'>
// 									<Button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'>
// 										<Vote className='mr-2 h-4 w-4' />
// 										View All Votes
// 									</Button>
// 								</Link>
// 								<Link href='/votes/1'>
// 									<Button
// 										variant='outline'
// 										className='border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400'
// 									>
// 										View Your Vote
// 									</Button>
// 								</Link>
// 							</div>
// 						</CardContent>
// 					</Card>
// 				)}
// 			</div>
// 			{creationError && (
// 				<Alert variant='destructive' className='mb-4'>
// 					<AlertCircle className='h-4 w-4' />
// 					<AlertDescription>{creationError}</AlertDescription>
// 				</Alert>
// 			)}
// 		</>
// 	);
// }

"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle2,
  Info,
  Plus,
  Trash2,
  Vote,
  X,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWallet } from "@/hooks/use-wallet-context";
import { useCreateCampaign } from "@/lib/contract";

// Default form data
const defaultFormData = {
  title: "",
  description: "",
  category: "",
  startDate: null as Date | null,
  endDate: null as Date | null,
  options: [
    { id: "1", label: "Yes", description: "Approve the proposal" },
    { id: "2", label: "No", description: "Reject the proposal" },
    { id: "3", label: "Abstain", description: "Neither approve nor reject" },
  ],
  content: "",
  eligibleWallets: [] as string[],
};

export default function CreateVotePage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newWallet, setNewWallet] = useState("");
  const [walletError, setWalletError] = useState("");
  const [csvError, setCsvError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { address, isConnected } = useWallet();
  const {
    createCampaign,
    isLoading: isContractLoading,
    isError: isContractError,
    isSuccess: isContractSuccess,
  } = useCreateCampaign();

  useEffect(() => {
    const savedVoteData = localStorage.getItem("draftVote");
    if (savedVoteData) {
      try {
        const parsedData = JSON.parse(savedVoteData);
        if (parsedData.startDate)
          parsedData.startDate = new Date(parsedData.startDate);
        if (parsedData.endDate)
          parsedData.endDate = new Date(parsedData.endDate);
        setFormData(parsedData);
      } catch (error) {
        console.error("Failed to parse vote data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("draftVote", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, startDate: date || null }));
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, endDate: date || null }));
  };

  const handleOptionChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      ),
    }));
  };

  const addOption = () => {
    const newId = (formData.options.length + 1).toString();
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: newId, label: "", description: "" }],
    }));
  };

  const removeOption = (id: string) => {
    if (formData.options.length <= 2) {
      alert("You must have at least 2 options");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
    }));
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      setCreationError("Please connect your wallet to create a vote");
      return;
    }

    setIsCreating(true);
    setCreationError(null);

    try {
      // Current date (April 04, 2025)
      const currentDate = new Date("2025-04-04T00:00:00Z");
      const startDate = formData.startDate
        ? new Date(formData.startDate)
        : null;
      const endDate = formData.endDate ? new Date(formData.endDate) : null;

      // Determine status
      let status = "UPCOMING";
      if (startDate && endDate) {
        if (currentDate >= startDate && currentDate <= endDate) {
          status = "ACTIVE";
        } else if (currentDate > endDate) {
          status = "CLOSED";
        }
      }

      // Convert dates to timestamps
      const startTimestamp = startDate
        ? Math.floor(startDate.getTime() / 1000)
        : 0;
      const endTimestamp = endDate ? Math.floor(endDate.getTime() / 1000) : 0;

      // Prepare campaign data for contract
      const campaignData = {
        description: formData.description,
        startTime: BigInt(startTimestamp),
        endTime: BigInt(endTimestamp),
        optionCount: BigInt(formData.options.length),
        publicKey:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
      };

      // Call the contract to create the campaign
      await createCampaign(campaignData);

      // Get entity data for the creator info
      const entityData = JSON.parse(localStorage.getItem("entityData") || "{}");

      // Prepare vote data
      const newVote = {
        id: `${Date.now()}`,
        title: formData.title,
        description: formData.description,
        status: status.toLowerCase(),
        startTime: startDate ? startDate.toISOString() : undefined,
        endTime: endDate ? endDate.toISOString() : undefined,
        participation: 0,
        category: formData.category,
        creator: {
          name: entityData.name || "Governance DAO",
          type: entityData.type || "DAO",
          id: "creator-1",
        },
        eligibleWallets: formData.eligibleWallets,
        options: formData.options,
        content: formData.content,
        createdAt: new Date().toISOString(),
        results: {
          yes: 0,
          no: 0,
          abstain: 0,
        },
        transactionHash: "pending",
      };

      // Save to local storage
      const createdVotes = JSON.parse(
        localStorage.getItem("createdVotes") || "[]"
      );
      createdVotes.push(newVote);
      localStorage.setItem("createdVotes", JSON.stringify(createdVotes));

      // Save as JSON file
      const jsonContent = JSON.stringify(newVote, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vote_${newVote.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Clear the draft
      localStorage.removeItem("draftVote");

      // Update entity stats
      if (entityData.votesCreated) {
        entityData.votesCreated += 1;
      } else {
        entityData.votesCreated = 1;
      }
      localStorage.setItem("entityData", JSON.stringify(entityData));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating campaign:", error);
      setCreationError(
        error instanceof Error ? error.message : "Failed to create campaign"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const addWallet = () => {
    if (!newWallet) {
      setWalletError("Please enter a wallet address");
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(newWallet)) {
      setWalletError("Please enter a valid Ethereum address (0x...)");
      return;
    }
    if (formData.eligibleWallets.includes(newWallet)) {
      setWalletError("This wallet is already in the list");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      eligibleWallets: [...prev.eligibleWallets, newWallet],
    }));
    setNewWallet(""); // Corrected: Reset to empty string
    setWalletError("");
  };

  const removeWallet = (wallet: string) => {
    setFormData((prev) => ({
      ...prev,
      eligibleWallets: prev.eligibleWallets.filter((w) => w !== wallet),
    }));
  };

  const isStep1Valid =
    formData.title && formData.description && formData.category;
  const isStep2Valid =
    formData.startDate &&
    formData.endDate &&
    formData.options.every((option) => option.label) &&
    formData.options.length >= 2;
  const isStep3Valid =
    formData.content.length > 0 && formData.eligibleWallets.length > 0;

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setCsvError("");

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const lines = content.split(/\r\n|\n/).filter((line) => line.trim());

        const validAddresses: string[] = [];
        const invalidAddresses: string[] = [];

        lines.forEach((line) => {
          const address = line.trim();
          if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
            if (
              !formData.eligibleWallets.includes(address) &&
              !validAddresses.includes(address)
            ) {
              validAddresses.push(address);
            }
          } else {
            invalidAddresses.push(address);
          }
        });

        if (invalidAddresses.length > 0) {
          setCsvError(
            `Found ${invalidAddresses.length} invalid addresses. Please ensure all addresses are in the format 0x... (42 characters)`
          );
        }

        if (validAddresses.length > 0) {
          setFormData((prev) => ({
            ...prev,
            eligibleWallets: [...prev.eligibleWallets, ...validAddresses],
          }));
        }

        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        setCsvError(
          "Failed to parse CSV file. Please ensure it contains one Ethereum address per line."
        );
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setCsvError("Failed to read the file. Please try again.");
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">
          Create a New Vote
        </h1>

        {!isSubmitted ? (
          <Card className="border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white">
                    New Vote Proposal
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Create a new vote for your community
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      step >= 1 ? "bg-purple-500" : "bg-slate-700"
                    }`}
                  ></span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      step >= 2 ? "bg-purple-500" : "bg-slate-700"
                    }`}
                  ></span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      step >= 3 ? "bg-purple-500" : "bg-slate-700"
                    }`}
                  ></span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Vote Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., Protocol Upgrade Proposal"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Short Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="A brief summary of what this vote is about"
                      required
                    />
                    <p className="text-xs text-slate-400">
                      This will appear in the vote listing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        <SelectItem value="protocol">Protocol</SelectItem>
                        <SelectItem value="treasury">Treasury</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-white">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? (
                              format(formData.startDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-700">
                          <Calendar
                            mode="single"
                            selected={formData.startDate || undefined}
                            onSelect={handleStartDateChange}
                            initialFocus
                            className="bg-slate-900 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? (
                              format(formData.endDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-700">
                          <Calendar
                            mode="single"
                            selected={formData.endDate || undefined}
                            onSelect={handleEndDateChange}
                            initialFocus
                            className="bg-slate-900 text-white"
                            disabled={(date) =>
                              (formData.startDate
                                ? date < formData.startDate
                                : false) || date < new Date()
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Voting Options</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-slate-700 text-slate-400 hover:bg-slate-800"
                        onClick={addOption}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Option
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {formData.options.map((option) => (
                        <div
                          key={option.id}
                          className="grid gap-2 md:grid-cols-5 items-start"
                        >
                          <div className="md:col-span-2">
                            <Input
                              value={option.label}
                              onChange={(e) =>
                                handleOptionChange(
                                  option.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="bg-slate-800 border-slate-700 text-white"
                              placeholder="Option label"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Input
                              value={option.description}
                              onChange={(e) =>
                                handleOptionChange(
                                  option.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="bg-slate-800 border-slate-700 text-white"
                              placeholder="Option description"
                            />
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-10 w-10 p-0 text-slate-400 hover:bg-red-900/20 hover:text-red-400"
                              onClick={() => removeOption(option.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-white">
                      Detailed Proposal
                    </Label>
                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                        <TabsTrigger
                          value="write"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                        >
                          Write
                        </TabsTrigger>
                        <TabsTrigger
                          value="preview"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                        >
                          Preview
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white min-h-[200px]"
                          placeholder="Provide a detailed description of your proposal. You can use HTML for formatting."
                          required
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="min-h-[200px] p-4 rounded-md border border-slate-700 bg-slate-800">
                          {formData.content ? (
                            <div
                              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400"
                              dangerouslySetInnerHTML={{
                                __html: formData.content,
                              }}
                            />
                          ) : (
                            <p className="text-slate-500 italic">
                              Nothing to preview yet...
                            </p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                    <p className="text-xs text-slate-400">
                      You can use HTML tags like &lt;h3&gt;, &lt;p&gt;,
                      &lt;ul&gt;, &lt;li&gt; for formatting
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Eligible Wallets</Label>
                    <p className="text-sm text-slate-400 mb-2">
                      Add wallet addresses that will be eligible to vote on this
                      proposal
                    </p>

                    <div className="flex gap-2">
                      <Input
                        value={newWallet}
                        onChange={(e) => setNewWallet(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white flex-grow"
                        placeholder="0x..."
                      />
                      <Button
                        variant="outline"
                        className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
                        onClick={addWallet}
                      >
                        Add
                      </Button>
                    </div>

                    {walletError && (
                      <p className="text-sm text-red-400 mt-1">{walletError}</p>
                    )}

                    <div className="mt-4 flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-grow">
                          <input
                            type="file"
                            accept=".csv,.txt"
                            onChange={handleCsvUpload}
                            ref={fileInputRef}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            disabled={isUploading}
                          />
                          <Button
                            variant="outline"
                            className="w-full border-slate-700 text-slate-400 hover:bg-slate-800"
                            disabled={isUploading}
                          >
                            {isUploading
                              ? "Uploading..."
                              : "Upload CSV/TXT File"}
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-slate-700 text-slate-400 hover:bg-slate-800"
                          onClick={() => {
                            const exampleWallets = [
                              "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                              "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
                              "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
                            ];
                            setFormData((prev) => ({
                              ...prev,
                              eligibleWallets: [
                                ...prev.eligibleWallets,
                                ...exampleWallets,
                              ],
                            }));
                          }}
                        >
                          Add Example Wallets
                        </Button>
                      </div>

                      {csvError && (
                        <Alert
                          variant="destructive"
                          className="bg-red-900/20 text-red-400 border-red-900"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{csvError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="text-xs text-slate-400">
                        Upload a CSV or TXT file with one Ethereum address per
                        line (0x...)
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {formData.eligibleWallets.length > 0 ? (
                        <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-white">
                              Eligible Wallets (
                              {formData.eligibleWallets.length})
                            </h4>
                            {formData.eligibleWallets.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs border-red-500/30 text-red-400 hover:bg-red-900/20"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    eligibleWallets: [],
                                  }))
                                }
                              >
                                Clear All
                              </Button>
                            )}
                          </div>
                          <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {formData.eligibleWallets.map((wallet, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-slate-800 rounded-md p-2"
                              >
                                <span className="text-sm text-slate-300 font-mono truncate">
                                  {wallet}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-slate-400 hover:bg-red-900/20 hover:text-red-400"
                                  onClick={() => removeWallet(wallet)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center">
                          <p className="text-sm text-slate-400">
                            No eligible wallets added yet
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div className="text-slate-300">
                        <p>Before submitting your vote proposal:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                          <li>Ensure all information is accurate and clear</li>
                          <li>
                            Make sure you've added all eligible wallet addresses
                          </li>
                          <li>
                            Only wallets on the eligibility list will be able to
                            vote
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {step === 1 ? (
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  onClick={handleNextStep}
                  disabled={!isStep1Valid}
                >
                  Continue
                </Button>
              ) : step === 2 ? (
                <div className="flex w-full gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    onClick={handleNextStep}
                    disabled={!isStep2Valid}
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                <div className="flex w-full gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    onClick={handleSubmit}
                    disabled={!isStep3Valid || isCreating || isContractLoading}
                  >
                    {isCreating || isContractLoading ? (
                      <>Creating Campaign...</>
                    ) : (
                      <>Create Vote</>
                    )}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Vote Created Successfully!
              </h2>
              <p className="text-slate-400 mb-6">
                Your vote proposal has been created and is now available for
                eligible wallets to vote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/votes">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    <Vote className="mr-2 h-4 w-4" />
                    View All Votes
                  </Button>
                </Link>
                <Link href="/votes/1">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400"
                  >
                    View Your Vote
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {creationError && (
        <Alert variant="destructive" className="mb-4 mx-auto max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{creationError}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
