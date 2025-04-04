"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Clock, Info, Lock, CheckCircle2, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DemoPage() {
  const [voteState, setVoteState] = useState<"pre-vote" | "post-vote" | "results-hidden" | "results-revealed">(
    "pre-vote",
  )
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [progressValues, setProgressValues] = useState({ yes: 0, no: 0, abstain: 0 })
  const [demoStep, setDemoStep] = useState(1)
  const [showTooltip, setShowTooltip] = useState(false)

  // Simulate the voting process for the demo
  const handleVote = () => {
    if (!selectedOption) return

    // Step 2: Vote recorded
    setVoteState("post-vote")
    setDemoStep(2)

    // Step 3: After a delay, show the encrypted results
    setTimeout(() => {
      setVoteState("results-hidden")
      setDemoStep(3)

      // Step 4: After another delay, reveal the results
      setTimeout(() => {
        setVoteState("results-revealed")
        setDemoStep(4)

        // Animate the progress bars
        animateResults()
      }, 5000)
    }, 5000)
  }

  // Animate the progress bars for the demo
  const animateResults = () => {
    let finalValues = {
      yes: 42,
      no: 35,
      abstain: 23,
    }

    // If the user voted, make their choice win
    if (selectedOption === "yes") {
      finalValues = { yes: 51, no: 30, abstain: 19 }
    } else if (selectedOption === "no") {
      finalValues = { yes: 30, no: 51, abstain: 19 }
    } else if (selectedOption === "abstain") {
      finalValues = { yes: 35, no: 35, abstain: 30 }
    }

    // Animate the progress bars
    let step = 0
    const totalSteps = 20
    const interval = setInterval(() => {
      step++
      setProgressValues({
        yes: Math.floor((finalValues.yes * step) / totalSteps),
        no: Math.floor((finalValues.no * step) / totalSteps),
        abstain: Math.floor((finalValues.abstain * step) / totalSteps),
      })

      if (step >= totalSteps) {
        clearInterval(interval)
      }
    }, 100)
  }

  // Reset the demo
  const resetDemo = () => {
    setVoteState("pre-vote")
    setSelectedOption(null)
    setProgressValues({ yes: 0, no: 0, abstain: 0 })
    setDemoStep(1)
  }

  // Show tooltip on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)

      // Hide tooltip after 5 seconds
      setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50">
      {/* Header */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-4 lg:gap-6">
          <Link href="/how-it-works" className="text-sm font-medium text-slate-300 hover:text-white">
            How It Works
          </Link>
          <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white">
            Features
          </Link>
          <Link href="/faq" className="text-sm font-medium text-slate-300 hover:text-white">
            FAQ
          </Link>
        </nav>

        <Button
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
          disabled
        >
          Connect Wallet
          <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs">Demo Mode</span>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        {/* Demo Instructions */}
        <div className="mx-auto mb-8 max-w-3xl rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
            <div>
              <h2 className="text-lg font-medium text-white">Demo Mode</h2>
              <p className="mt-1 text-slate-300">
                This is a demonstration of the confidential voting process. Follow the steps below to experience how
                secure voting works.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`border-purple-500 ${demoStep === 1 ? "bg-purple-500/20 text-purple-400" : "text-slate-400"}`}
                >
                  1. Cast Vote
                </Badge>
                <Badge
                  variant="outline"
                  className={`border-purple-500 ${demoStep === 2 ? "bg-purple-500/20 text-purple-400" : "text-slate-400"}`}
                >
                  2. Confirmation
                </Badge>
                <Badge
                  variant="outline"
                  className={`border-purple-500 ${demoStep === 3 ? "bg-purple-500/20 text-purple-400" : "text-slate-400"}`}
                >
                  3. Encrypted Results
                </Badge>
                <Badge
                  variant="outline"
                  className={`border-purple-500 ${demoStep === 4 ? "bg-purple-500/20 text-purple-400" : "text-slate-400"}`}
                >
                  4. Revealed Results
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Voting Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold sm:text-3xl text-white">Demo Proposal: New Feature Implementation</h1>
              <Badge className="w-fit bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400">
                Active
              </Badge>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-400">
                Should we implement the new feature set in the next release? This is a demonstration proposal to
                showcase the voting interface.
              </p>

              <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>Demo ends in 5m</span>
              </div>
            </div>
          </div>

          {/* Confidential Voting Card */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardHeader className="border-b border-slate-800 bg-slate-900/80 pb-4">
              <CardTitle className="text-xl text-white">Cast Your Vote</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-slate-400">
                <Lock className="h-4 w-4 text-purple-400" />
                Your vote is encrypted and confidential
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {voteState === "pre-vote" && (
                <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-4">
                  <TooltipProvider>
                    <Tooltip open={showTooltip}>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                            selectedOption === "yes"
                              ? "border-purple-500/50 bg-purple-500/10"
                              : "border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800"
                          }`}
                          onClick={() => setSelectedOption("yes")}
                        >
                          <RadioGroupItem value="yes" id="yes" className="border-slate-600 text-purple-500" />
                          <div className="flex-1">
                            <Label htmlFor="yes" className="text-lg font-medium cursor-pointer text-white">
                              Yes
                            </Label>
                            <p className="mt-1 text-sm text-slate-400">Implement the new feature set</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>Select an option to vote. Your choice will be encrypted.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                      selectedOption === "no"
                        ? "border-purple-500/50 bg-purple-500/10"
                        : "border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800"
                    }`}
                    onClick={() => setSelectedOption("no")}
                  >
                    <RadioGroupItem value="no" id="no" className="border-slate-600 text-purple-500" />
                    <div className="flex-1">
                      <Label htmlFor="no" className="text-lg font-medium cursor-pointer text-white">
                        No
                      </Label>
                      <p className="mt-1 text-sm text-slate-400">Delay the new feature set</p>
                    </div>
                  </div>

                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                      selectedOption === "abstain"
                        ? "border-purple-500/50 bg-purple-500/10"
                        : "border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800"
                    }`}
                    onClick={() => setSelectedOption("abstain")}
                  >
                    <RadioGroupItem value="abstain" id="abstain" className="border-slate-600 text-purple-500" />
                    <div className="flex-1">
                      <Label htmlFor="abstain" className="text-lg font-medium cursor-pointer text-white">
                        Abstain
                      </Label>
                      <p className="mt-1 text-sm text-slate-400">Neither approve nor reject the proposal</p>
                    </div>
                  </div>
                </RadioGroup>
              )}

              {voteState === "post-vote" && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Vote Recorded!</h3>
                  <p className="mt-2 text-slate-400">
                    Your vote has been encrypted and recorded. For this demo, results will be revealed in a few seconds.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                </div>
              )}

              {voteState === "results-hidden" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Current Results</h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <Lock className="h-4 w-4" />
                      <span>Encrypted until voting ends</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Yes</span>
                        <span className="text-slate-400">?%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div className="h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">No</span>
                        <span className="text-slate-400">?%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div className="h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Abstain</span>
                        <span className="text-slate-400">?%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div className="h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center text-sm text-slate-400">
                    <Lock className="h-4 w-4" />
                    <span>Results will be revealed in a few seconds (demo only)</span>
                  </div>
                </div>
              )}

              {voteState === "results-revealed" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Final Results</h3>
                    <div className="flex items-center gap-1.5 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Voting complete</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Yes</span>
                        <span className="text-slate-400">{progressValues.yes}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${progressValues.yes}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">No</span>
                        <span className="text-slate-400">{progressValues.no}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${progressValues.no}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Abstain</span>
                        <span className="text-slate-400">{progressValues.abstain}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${progressValues.abstain}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-center text-sm text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {selectedOption === "yes" && progressValues.yes > progressValues.no
                        ? "Proposal approved! Your vote helped pass this proposal."
                        : selectedOption === "no" && progressValues.no > progressValues.yes
                          ? "Proposal rejected! Your vote helped reject this proposal."
                          : "Voting complete. Thank you for participating in this demo."}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t border-slate-800 bg-slate-900/80 p-4">
              {voteState === "pre-vote" && (
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  disabled={!selectedOption}
                  onClick={handleVote}
                >
                  Submit Vote
                </Button>
              )}

              {voteState === "post-vote" && (
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  disabled
                >
                  Vote Submitted
                </Button>
              )}

              {voteState === "results-hidden" && (
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-400 hover:bg-slate-800"
                  disabled
                >
                  Awaiting Results...
                </Button>
              )}

              {voteState === "results-revealed" && (
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={resetDemo}
                >
                  Reset Demo
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Demo Explanation */}
          <div className="mt-8">
            <Collapsible
              open={isHowItWorksOpen}
              onOpenChange={setIsHowItWorksOpen}
              className="rounded-lg border border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">What's happening behind the scenes?</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isHowItWorksOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-4 text-sm text-slate-400">
                  <p>This demo simulates the confidential voting process. Here's what happens at each step:</p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">1. Cast Vote</h4>
                    <p>
                      When you select an option and submit your vote, in a real implementation, your vote would be
                      encrypted on your device using a public key. This ensures that no one, not even the system
                      administrators, can see your individual vote.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">2. Confirmation</h4>
                    <p>
                      After your encrypted vote is submitted, you receive a confirmation that your vote was recorded. In
                      a real implementation, you would also receive a cryptographic receipt that you could use to verify
                      your vote was included in the final tally.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">3. Encrypted Results</h4>
                    <p>
                      While voting is in progress, the results remain encrypted. Using fully homomorphic encryption
                      (FHE), votes can be tallied without ever decrypting individual votes, maintaining privacy
                      throughout the process. This revolutionary technology prevents corruption by eliminating any
                      opportunity for vote manipulation, making it ideal for ensuring fair elections worldwide.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">4. Revealed Results</h4>
                    <p>
                      Once voting ends, the final tally is revealed. In a real implementation, this would require a
                      threshold of authorized parties to cooperate in decrypting the final tally, ensuring that no
                      single entity can manipulate the results.
                    </p>
                  </div>

                  <div className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
                    <p className="text-purple-400">
                      <strong>Note:</strong> This is a simplified demonstration. In a real implementation, fully
                      homomorphic encryption (FHE) and additional cryptographic techniques would be used to ensure the
                      integrity and confidentiality of the voting process, creating a truly fair system that prevents
                      corruption in elections.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Learn More Section */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white">Want to learn more?</h2>
          <p className="mt-4 text-slate-400">
            Explore our detailed documentation to understand how confidential voting works and the technology behind it.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/how-it-works">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                How It Works
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                className="border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400"
              >
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold">SecureVote</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                A privacy-focused voting platform that ensures your vote remains confidential.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-300">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/how-it-works" className="text-sm text-slate-400 hover:text-white">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="text-sm text-slate-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-sm text-slate-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-300">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-slate-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-slate-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-slate-800" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-slate-400">
              &copy; {new Date().getFullYear()} SecureVote. All rights reserved.
            </p>
            <p className="text-center text-sm text-slate-400">
              This is a demo project. No actual voting functionality is implemented.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

