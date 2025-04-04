// 'use client';

// import type React from 'react';

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
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Building2, CheckCircle2, Info } from 'lucide-react';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function RegisterPage() {
// 	const [formData, setFormData] = useState({
// 		name: '',
// 		type: 'dao',
// 		description: '',
// 		website: '',
// 		twitter: '',
// 		email: '',
// 	});

// 	const [step, setStep] = useState(1);
// 	const [isSubmitted, setIsSubmitted] = useState(false);

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleTypeChange = (value: string) => {
// 		setFormData((prev) => ({ ...prev, type: value }));
// 	};

// 	const handleNextStep = () => {
// 		setStep(2);
// 	};

// 	const handleSubmit = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		// In a real app, this would submit to a backend
// 		setIsSubmitted(true);
// 	};

// 	return (
// 		<div className='max-w-2xl mx-auto'>
// 			<h1 className='text-3xl font-bold text-white mb-6 text-center'>
// 				Register as an Entity
// 			</h1>

// 			{!isSubmitted ? (
// 				<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
// 					<CardHeader>
// 						<CardTitle className='text-xl text-white'>
// 							Entity Registration
// 						</CardTitle>
// 						<CardDescription className='text-slate-400'>
// 							Create an entity profile to start creating votes
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent>
// 						{step === 1 ? (
// 							<div className='space-y-4'>
// 								<div className='space-y-2'>
// 									<Label htmlFor='name' className='text-white'>
// 										Entity Name
// 									</Label>
// 									<Input
// 										id='name'
// 										name='name'
// 										value={formData.name}
// 										onChange={handleInputChange}
// 										className='bg-slate-800 border-slate-700 text-white'
// 										placeholder='e.g., Governance DAO'
// 										required
// 									/>
// 								</div>

// 								<div className='space-y-2'>
// 									<Label className='text-white'>Entity Type</Label>
// 									<RadioGroup
// 										value={formData.type}
// 										onValueChange={handleTypeChange}
// 									>
// 										<div className='flex items-center space-x-2'>
// 											<RadioGroupItem
// 												value='dao'
// 												id='dao'
// 												className='border-slate-600 text-purple-500'
// 											/>
// 											<Label
// 												htmlFor='dao'
// 												className='text-slate-300 cursor-pointer'
// 											>
// 												DAO
// 											</Label>
// 										</div>
// 										<div className='flex items-center space-x-2'>
// 											<RadioGroupItem
// 												value='corporation'
// 												id='corporation'
// 												className='border-slate-600 text-purple-500'
// 											/>
// 											<Label
// 												htmlFor='corporation'
// 												className='text-slate-300 cursor-pointer'
// 											>
// 												Corporation
// 											</Label>
// 										</div>
// 										<div className='flex items-center space-x-2'>
// 											<RadioGroupItem
// 												value='nonprofit'
// 												id='nonprofit'
// 												className='border-slate-600 text-purple-500'
// 											/>
// 											<Label
// 												htmlFor='nonprofit'
// 												className='text-slate-300 cursor-pointer'
// 											>
// 												Non-profit
// 											</Label>
// 										</div>
// 										<div className='flex items-center space-x-2'>
// 											<RadioGroupItem
// 												value='other'
// 												id='other'
// 												className='border-slate-600 text-purple-500'
// 											/>
// 											<Label
// 												htmlFor='other'
// 												className='text-slate-300 cursor-pointer'
// 											>
// 												Other
// 											</Label>
// 										</div>
// 									</RadioGroup>
// 								</div>

// 								<div className='space-y-2'>
// 									<Label htmlFor='description' className='text-white'>
// 										Description
// 									</Label>
// 									<Textarea
// 										id='description'
// 										name='description'
// 										value={formData.description}
// 										onChange={handleInputChange}
// 										className='bg-slate-800 border-slate-700 text-white min-h-[100px]'
// 										placeholder='Describe your entity and its purpose'
// 										required
// 									/>
// 								</div>
// 							</div>
// 						) : (
// 							<div className='space-y-4'>
// 								<div className='space-y-2'>
// 									<Label htmlFor='website' className='text-white'>
// 										Website (optional)
// 									</Label>
// 									<Input
// 										id='website'
// 										name='website'
// 										value={formData.website}
// 										onChange={handleInputChange}
// 										className='bg-slate-800 border-slate-700 text-white'
// 										placeholder='https://example.com'
// 									/>
// 								</div>

// 								<div className='space-y-2'>
// 									<Label htmlFor='twitter' className='text-white'>
// 										Twitter (optional)
// 									</Label>
// 									<Input
// 										id='twitter'
// 										name='twitter'
// 										value={formData.twitter}
// 										onChange={handleInputChange}
// 										className='bg-slate-800 border-slate-700 text-white'
// 										placeholder='@username'
// 									/>
// 								</div>

// 								<div className='space-y-2'>
// 									<Label htmlFor='email' className='text-white'>
// 										Contact Email
// 									</Label>
// 									<Input
// 										id='email'
// 										name='email'
// 										type='email'
// 										value={formData.email}
// 										onChange={handleInputChange}
// 										className='bg-slate-800 border-slate-700 text-white'
// 										placeholder='contact@example.com'
// 										required
// 									/>
// 								</div>

// 								<div className='rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm'>
// 									<div className='flex gap-2'>
// 										<Info className='h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5' />
// 										<div className='text-slate-300'>
// 											<p>
// 												In a real implementation, we would verify your entity
// 												through:
// 											</p>
// 											<ul className='list-disc pl-5 mt-2 space-y-1 text-slate-400'>
// 												<li>Wallet signature verification</li>
// 												<li>Email confirmation</li>
// 												<li>Social media verification</li>
// 											</ul>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</CardContent>
// 					<CardFooter>
// 						{step === 1 ? (
// 							<Button
// 								className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
// 								onClick={handleNextStep}
// 								disabled={!formData.name || !formData.description}
// 							>
// 								Continue
// 							</Button>
// 						) : (
// 							<div className='flex w-full gap-4'>
// 								<Button
// 									variant='outline'
// 									className='flex-1 border-slate-700 text-slate-400 hover:bg-slate-800'
// 									onClick={() => setStep(1)}
// 								>
// 									Back
// 								</Button>
// 								<Button
// 									className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
// 									onClick={handleSubmit}
// 									disabled={!formData.email}
// 								>
// 									Complete Registration
// 								</Button>
// 							</div>
// 						)}
// 					</CardFooter>
// 				</Card>
// 			) : (
// 				<Card className='border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur'>
// 					<CardContent className='pt-6 pb-6 flex flex-col items-center text-center'>
// 						<div className='w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4'>
// 							<CheckCircle2 className='h-8 w-8 text-green-500' />
// 						</div>
// 						<h2 className='text-2xl font-bold text-white mb-2'>
// 							Registration Successful!
// 						</h2>
// 						<p className='text-slate-400 mb-6'>
// 							Your entity has been registered successfully. You can now create
// 							and manage votes.
// 						</p>
// 						<Link href='/profile'>
// 							<Button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'>
// 								<Building2 className='mr-2 h-4 w-4' />
// 								Go to Your Profile
// 							</Button>
// 						</Link>
// 					</CardContent>
// 				</Card>
// 			)}
// 		</div>
// 	);
// }

"use client";

import type React from "react";
import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, CheckCircle2, Info, Wallet } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/hooks/use-wallet-context";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "dao",
    description: "",
    website: "",
    twitter: "",
    email: "",
    walletAddress: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { address, isConnected } = useWallet();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      setError("Please connect your wallet.");
      return;
    }

    setError("");
    try {
      const response = await fetch("/api/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, walletAddress: address }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to register entity");
      }

      const entityData = await response.json();
      localStorage.setItem("entityData", JSON.stringify(entityData)); // For compatibility
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isStep1Valid = formData.name && formData.description;
  const isStep2Valid = formData.email;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Register as an Entity
      </h1>

      {!isSubmitted ? (
        <Card className="border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Entity Registration
            </CardTitle>
            <CardDescription className="text-slate-400">
              Create an entity profile to start creating votes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Entity Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="e.g., Governance DAO"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Entity Type</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={handleTypeChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="dao"
                        id="dao"
                        className="border-slate-600 text-purple-500"
                      />
                      <Label
                        htmlFor="dao"
                        className="text-slate-300 cursor-pointer"
                      >
                        DAO
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="corporation"
                        id="corporation"
                        className="border-slate-600 text-purple-500"
                      />
                      <Label
                        htmlFor="corporation"
                        className="text-slate-300 cursor-pointer"
                      >
                        Corporation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="nonprofit"
                        id="nonprofit"
                        className="border-slate-600 text-purple-500"
                      />
                      <Label
                        htmlFor="nonprofit"
                        className="text-slate-300 cursor-pointer"
                      >
                        Non-profit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="other"
                        id="other"
                        className="border-slate-600 text-purple-500"
                      />
                      <Label
                        htmlFor="other"
                        className="text-slate-300 cursor-pointer"
                      >
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                    placeholder="Describe your entity and its purpose"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">
                    Website (optional)
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-white">
                    Twitter (optional)
                  </Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Contact Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="contact@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Wallet Address</Label>
                  <Input
                    value={address || "Connect wallet first"}
                    disabled
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="text-slate-300">
                      <p>
                        Your connected wallet will be used to register the
                        entity.
                      </p>
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
            ) : (
              <div className="flex w-full gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  onClick={handleSubmit}
                  disabled={!isStep2Valid || !isConnected}
                >
                  Complete Registration
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
              Registration Successful!
            </h2>
            <p className="text-slate-400 mb-6">
              Your entity has been registered successfully. You can now create
              and manage votes.
            </p>
            <Link href="/profile">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                <Building2 className="mr-2 h-4 w-4" />
                Go to Your Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
