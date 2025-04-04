"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  ExternalLink,
  Info,
  Lock,
  Shield,
  Wallet,
  ChevronDown,
  Users,
  BarChart3,
  FileText,
  Calendar,
  User,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useWallet } from "@/hooks/use-wallet-context";
import {
  useVote,
  useCampaignDescription,
  useCampaignEndTime,
  useCampaignOptionCount,
  useIsCampaignTallied,
  useTallyVotes,
} from "@/lib/contract";

// Mock data for votes
const MOCK_VOTES = [
  {
    id: "1",
    title: "Protocol Upgrade Proposal",
    description:
      "This proposal aims to upgrade the core protocol to version 2.0, introducing significant improvements to scalability and security. The upgrade includes a new consensus mechanism and enhanced privacy features through fully homomorphic encryption.",
    longDescription: `
      <h3>Background</h3>
      <p>The current protocol version 1.5 has served us well, but has reached its limits in terms of transaction throughput and privacy guarantees.</p>
      
      <h3>Proposed Changes</h3>
      <p>Version 2.0 introduces the following key improvements:</p>
      <ul>
        <li>Enhanced fully homomorphic encryption for better vote privacy</li>
        <li>Improved consensus mechanism for faster finality</li>
        <li>Reduced computational requirements for validators</li>
        <li>New governance features for more decentralized decision-making</li>
      </ul>
      
      <h3>Implementation Timeline</h3>
      <p>If approved, the upgrade will be implemented in three phases over the next 6 months:</p>
      <ul>
        <li>Phase 1: Testnet deployment (Month 1-2)</li>
        <li>Phase 2: Security audits and bug fixes (Month 3-4)</li>
        <li>Phase 3: Mainnet deployment (Month 5-6)</li>
      </ul>
    `,
    status: "active",
    endTime: "2d 14h",
    startedAt: "May 15, 2023",
    endsAt: "May 30, 2023",
    participation: 42,
    category: "Protocol",
    options: [
      { id: "yes", label: "Yes", description: "Approve the protocol upgrade" },
      { id: "no", label: "No", description: "Reject the protocol upgrade" },
      {
        id: "abstain",
        label: "Abstain",
        description: "Neither approve nor reject",
      },
    ],
    results: {
      yes: 65,
      no: 25,
      abstain: 10,
    },
    totalVotes: 1245,
    creator: {
      name: "Protocol Team",
      type: "Core Team",
      id: "team-1",
    },
    discussions: 28,
    eligibleWallets: [
      "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
      "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
      "0xf10358d78C58e9A540bAEbcaF3074D5A9FCf5Db9",
    ],
  },
  {
    id: "2",
    title: "Treasury Allocation Q2",
    description:
      "Decide how to allocate the treasury funds for the second quarter of the fiscal year.",
    longDescription: `
      <h3>Treasury Status</h3>
      <p>The current treasury balance is 1.2M tokens, with approximately 300K tokens available for allocation this quarter.</p>
      
      <h3>Proposed Allocation</h3>
      <p>This proposal suggests the following allocation:</p>
      <ul>
        <li>40% for protocol development</li>
        <li>30% for marketing and user acquisition</li>
        <li>20% for security audits</li>
        <li>10% for community initiatives</li>
      </ul>
      
      <h3>Rationale</h3>
      <p>This allocation prioritizes continued development while ensuring adequate resources for growth and security. The community initiatives fund will be governed by a separate proposal for specific projects.</p>
    `,
    status: "active",
    endTime: "5d 8h",
    startedAt: "May 10, 2023",
    endsAt: "June 10, 2023",
    participation: 38,
    category: "Treasury",
    options: [
      {
        id: "yes",
        label: "Yes",
        description: "Approve the proposed allocation",
      },
      { id: "no", label: "No", description: "Reject the proposed allocation" },
      {
        id: "abstain",
        label: "Abstain",
        description: "Neither approve nor reject",
      },
    ],
    results: {
      yes: 58,
      no: 32,
      abstain: 10,
    },
    totalVotes: 876,
    creator: {
      name: "Finance DAO",
      type: "DAO",
      id: "dao-1",
    },
    discussions: 42,
    eligibleWallets: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"],
  },
  {
    id: "3",
    title: "New Governance Structure",
    description: "Vote on the proposed changes to the governance structure",
    longDescription: `
      <h3>Current Governance</h3>
      <p>The current governance model relies on token-weighted voting with a simple majority threshold.</p>
      
      <h3>Proposed Changes</h3>
      <p>This proposal suggests implementing:</p>
      <ul>
        <li>Quadratic voting to reduce plutocracy</li>
        <li>Delegation capabilities for passive token holders</li>
        <li>Two-phase voting with discussion period</li>
        <li>Different quorum requirements based on proposal type</li>
      </ul>
      
      <h3>Expected Benefits</h3>
      <p>These changes aim to increase participation, improve representation, and ensure more thoughtful governance decisions.</p>
    `,
    status: "upcoming",
    startTime: "3d 10h",
    startedAt: "June 1, 2023",
    endsAt: "June 15, 2023",
    category: "Governance",
    options: [
      {
        id: "yes",
        label: "Yes",
        description: "Approve the new governance structure",
      },
      {
        id: "no",
        label: "No",
        description: "Keep the current governance structure",
      },
      {
        id: "abstain",
        label: "Abstain",
        description: "Neither approve nor reject",
      },
    ],
    creator: {
      name: "Governance Council",
      type: "Council",
      id: "council-1",
    },
    discussions: 56,
    eligibleWallets: ["0x2546BcD3c84621e976D8185a91A922aE77ECEc30"],
  },
];

export default function VoteDetailPage() {
  const params = useParams();
  const voteId = params.id as string;
  const [votes, setVotes] = useState(MOCK_VOTES);
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [isTallying, setIsTallying] = useState(false);
  const [tallyError, setTallyError] = useState<string | null>(null);

  // Get wallet context
  const { address, isConnected } = useWallet();

  // Get contract functions
  const {
    vote: submitVote,
    isLoading: isVoteLoading,
    isError: isVoteError,
    isSuccess: isVoteSuccess,
  } = useVote();
  const {
    tallyVotes,
    isLoading: isTallyLoading,
    isError: isTallyError,
    isSuccess: isTallySuccess,
  } = useTallyVotes();

  // Get campaign data from contract
  const campaignId = BigInt(voteId);
  const { description: contractDescription, isLoading: isDescriptionLoading } =
    useCampaignDescription(campaignId);
  const { endTime: contractEndTime, isLoading: isEndTimeLoading } =
    useCampaignEndTime(campaignId);
  const { optionCount: contractOptionCount, isLoading: isOptionCountLoading } =
    useCampaignOptionCount(campaignId);
  const { isTallied: contractIsTallied, isLoading: isTalliedLoading } =
    useIsCampaignTallied(campaignId);

  // Load votes from local storage
  useEffect(() => {
    const createdVotes = JSON.parse(
      localStorage.getItem("createdVotes") || "[]"
    );
    if (createdVotes.length > 0) {
      // Combine mock votes with created votes
      setVotes([...createdVotes, ...MOCK_VOTES]);
    }
  }, []);

  // Update user wallet when connected
  useEffect(() => {
    if (isConnected && address) {
      setUserWallet(address);
    } else {
      setUserWallet(null);
    }
  }, [isConnected, address]);

  // Find the vote with the matching ID
  const vote = votes.find((v) => v.id === voteId);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voteState, setVoteState] = useState<
    "pre-vote" | "post-vote" | "results-hidden" | "results-revealed"
  >(
    vote?.status === "active"
      ? "pre-vote"
      : vote?.status === "closed"
      ? "results-revealed"
      : "results-hidden"
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  // Check if user is eligible to vote
  const isEligible = () => {
    if (!address || !vote) return false;
    if (!vote.eligibleWallets) return false;
    return vote.eligibleWallets.includes(address);
  };

  // Handle vote submission
  const handleVote = async () => {
    if (
      !selectedOption ||
      vote?.status !== "active" ||
      !isEligible() ||
      !isConnected
    ) {
      setVoteError("Please connect your wallet and select an option to vote");
      return;
    }

    setIsVoting(true);
    setVoteError(null);

    try {
      // Convert selected option to index (0-based)
      const optionIndex =
        vote?.options.findIndex((opt) => opt.id === selectedOption) ?? -1;
      if (optionIndex === -1) {
        throw new Error("Invalid option selected");
      }

      // Call the contract to submit the vote
      const result = await submitVote({
        campaignId: BigInt(voteId),
        optionIndex: BigInt(optionIndex),
      });

      // Update local state
      setVoteState("post-vote");

      // After a delay, show the results
      setTimeout(() => {
        setVoteState("results-revealed");
      }, 3000);
    } catch (error) {
      console.error("Error submitting vote:", error);
      setVoteError(
        error instanceof Error ? error.message : "Failed to submit vote"
      );
    } finally {
      setIsVoting(false);
    }
  };

  // Handle tallying votes
  const handleTallyVotes = async () => {
    if (!isConnected || !vote) return;

    setIsTallying(true);
    setTallyError(null);

    try {
      // Call the contract to tally votes
      const result = await tallyVotes(BigInt(voteId));

      // Update vote status to closed
      const updatedVotes = votes.map((v) => {
        if (v.id === voteId) {
          return { ...v, status: "closed" };
        }
        return v;
      });

      setVotes(updatedVotes);
      setVoteState("results-revealed");

      // Update in localStorage
      localStorage.setItem("createdVotes", JSON.stringify(updatedVotes));
    } catch (error) {
      console.error("Error tallying votes:", error);
      setTallyError(
        error instanceof Error ? error.message : "Failed to tally votes"
      );
    } finally {
      setIsTallying(false);
    }
  };

  if (!vote) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Vote Not Found</h1>
            <p className="mt-2 text-slate-400">
              The vote you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/votes">
              <Button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Votes
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Back to Votes */}
      <div className="mb-6">
        <Link
          href="/votes"
          className="inline-flex items-center text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Votes
        </Link>
      </div>

      {/* Vote Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            {vote.title}
          </h1>
          <Badge
            className={
              vote.status === "active"
                ? "bg-green-500/20 text-green-400"
                : vote.status === "upcoming"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-slate-500/20 text-slate-400"
            }
          >
            {vote.status === "active"
              ? "Active"
              : vote.status === "upcoming"
              ? "Upcoming"
              : "Closed"}
          </Badge>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-400">{vote.description}</p>
          {vote.status === "active" && (
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-purple-400" />
              <span>Ends in {vote.endTime}</span>
            </div>
          )}
          {vote.status === "upcoming" && (
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>Starts in {vote.startTime}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            {vote.category}
          </Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            <Calendar className="mr-1 h-3 w-3" />
            {vote.startedAt} - {vote.endsAt}
          </Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            <Users className="mr-1 h-3 w-3" />
            {vote.totalVotes || 0} votes
          </Badge>
          <Badge variant="outline" className="border-slate-700 text-slate-400">
            <User className="mr-1 h-3 w-3" />
            Created by {vote.creator.name}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Voting Card */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardHeader className="border-b border-slate-800 bg-slate-900/80 pb-4">
              <CardTitle className="text-xl text-white">
                Cast Your Vote
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-slate-400">
                <Lock className="h-4 w-4 text-purple-400" />
                Your vote is encrypted and confidential
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {!isEligible() && vote.status === "active" && (
                <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-slate-300">
                      <p className="font-medium text-yellow-400">
                        Not Eligible to Vote
                      </p>
                      <p className="mt-1">
                        Your wallet address is not on the eligibility list for
                        this vote. Only wallets that have been added to the
                        eligibility list by the vote creator can participate.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {vote.status === "upcoming" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Voting Not Yet Open
                  </h3>
                  <p className="mt-2 text-slate-400">
                    This vote will open for participation in {vote.startTime}.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    <Info className="h-4 w-4" />
                    <span>You can review the proposal details below</span>
                  </div>
                </div>
              ) : voteState === "pre-vote" && vote.status === "active" ? (
                <RadioGroup
                  value={selectedOption || ""}
                  onValueChange={setSelectedOption}
                  className="space-y-4"
                >
                  {vote.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                        selectedOption === option.id
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-slate-800 bg-slate-800/50 hover:border-purple-500/30 hover:bg-slate-800"
                      } ${
                        !isEligible() ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        isEligible() && setSelectedOption(option.id)
                      }
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="border-slate-600 text-purple-500"
                        disabled={!isEligible()}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={option.id}
                          className={`text-lg font-medium cursor-pointer text-white ${
                            !isEligible() ? "cursor-not-allowed" : ""
                          }`}
                        >
                          {option.label}
                        </Label>
                        <p className="mt-1 text-sm text-slate-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ) : voteState === "post-vote" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Vote Recorded!
                  </h3>
                  <p className="mt-2 text-slate-400">
                    Your vote has been encrypted and recorded. Results will be
                    revealed when voting ends.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Results</h3>
                    {vote.status === "active" ? (
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Lock className="h-4 w-4" />
                        <span>Preliminary results</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-sm text-green-400">
                        <Check className="h-4 w-4" />
                        <span>Final results</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {vote.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white">{option.label}</span>
                          <span className="text-slate-400">
                            {vote.results &&
                              vote.results[
                                option.id as keyof typeof vote.results
                              ]}
                            %
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800 p-[1px]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{
                              width: `${
                                vote.results
                                  ? vote.results[
                                      option.id as keyof typeof vote.results
                                    ]
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Votes</span>
                    <span className="font-medium text-white">
                      {vote.totalVotes}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t border-slate-800 bg-slate-900/80 p-4">
              {vote.status === "upcoming" ? (
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  disabled
                >
                  Voting Not Yet Open
                </Button>
              ) : voteState === "pre-vote" && vote.status === "active" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                          disabled={
                            !selectedOption ||
                            !isEligible() ||
                            isVoting ||
                            isVoteLoading
                          }
                          onClick={handleVote}
                        >
                          {isVoting || isVoteLoading ? (
                            <>Submitting Vote...</>
                          ) : (
                            <>Submit Vote</>
                          )}
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {!isEligible()
                        ? "Your wallet is not on the eligibility list for this vote"
                        : selectedOption
                        ? "Submit your vote"
                        : "Select an option to vote"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : voteState === "post-vote" ? (
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  disabled
                >
                  Vote Submitted
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-purple-500 hover:bg-slate-800 hover:text-purple-400"
                  onClick={() => setVoteState("pre-vote")}
                  disabled={vote.status !== "active" || !isEligible()}
                >
                  {vote.status === "active" && isEligible()
                    ? "Change Vote"
                    : "Voting Closed"}
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Proposal Details */}
          <div className="mt-6">
            <Collapsible
              open={isDetailsOpen}
              onOpenChange={setIsDetailsOpen}
              className="rounded-lg border border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">
                      Proposal Details
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDetailsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300">
                  <div
                    dangerouslySetInnerHTML={{ __html: vote.longDescription }}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-800/30 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Proposer</span>
                    <span className="text-white">
                      {vote.creator.name} ({vote.creator.type})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Created</span>
                    <span className="text-white">{vote.startedAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ends</span>
                    <span className="text-white">{vote.endsAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Discussion threads</span>
                    <span className="text-white">{vote.discussions}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Eligibility List */}
          <div className="mt-4">
            <Collapsible
              open={isEligibilityOpen}
              onOpenChange={setIsEligibilityOpen}
              className="rounded-lg border border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">
                      Eligibility List
                    </span>
                    <Badge className="ml-2 bg-slate-800 text-slate-400">
                      {vote.eligibleWallets?.length || 0} wallets
                    </Badge>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isEligibilityOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="text-sm text-slate-400 mb-3">
                  Only wallets on this list are eligible to participate in this
                  vote.
                </div>

                {vote.eligibleWallets && vote.eligibleWallets.length > 0 ? (
                  <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {vote.eligibleWallets.map((wallet, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-slate-800 rounded-md p-2"
                        >
                          <span className="text-sm text-slate-300 font-mono truncate">
                            {wallet}
                          </span>
                          {address === wallet && (
                            <Badge className="bg-green-500/20 text-green-400">
                              <Check className="h-3 w-3 mr-1" />
                              Your Wallet
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-4 text-center">
                    <p className="text-sm text-slate-400">
                      No eligible wallets found for this vote
                    </p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Vote Information */}
          <Card className="border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Vote Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Confidential Voting
                  </h3>
                  <p className="text-sm text-slate-400">
                    Your vote is encrypted and private
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Participation</h3>
                  <p className="text-sm text-slate-400">
                    {vote.participation}% of eligible voters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Created By</h3>
                  <p className="text-sm text-slate-400">
                    {vote.creator.name} ({vote.creator.type})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Eligibility</h3>
                  <p className="text-sm text-slate-400">
                    {isEligible()
                      ? "Your wallet is eligible to vote"
                      : "Your wallet is not eligible"}
                  </p>
                </div>
              </div>

              {/* Connected Wallet Section */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Connected with</h3>
                  <p className="text-sm text-slate-400 font-mono">
                    {isConnected && address
                      ? `${address.substring(0, 6)}...${address.substring(
                          address.length - 4
                        )}`
                      : "Not connected"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Total Votes</h3>
                  <p className="text-sm text-slate-400">
                    {vote.totalVotes || 0} votes cast
                  </p>
                </div>
              </div>

              <Separator className="bg-slate-800" />

              <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                <h3 className="font-medium text-white">How voting works</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Votes are encrypted using fully homomorphic encryption (FHE)
                  to ensure privacy while allowing for verifiable results.
                </p>
                <Link href="/how-it-works">
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 text-purple-400 hover:text-purple-300"
                  >
                    Learn more about our voting system
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Votes */}
          <Card className="mt-6 border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Related Votes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {votes
                .filter((v) => v.id !== vote.id && v.category === vote.category)
                .map((relatedVote) => (
                  <Link href={`/votes/${relatedVote.id}`} key={relatedVote.id}>
                    <div className="flex items-start gap-3 rounded-lg border border-slate-800 p-3 transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
                      <Badge
                        className={
                          relatedVote.status === "active"
                            ? "bg-green-500/20 text-green-400 h-fit"
                            : relatedVote.status === "upcoming"
                            ? "bg-blue-500/20 text-blue-400 h-fit"
                            : "bg-slate-500/20 text-slate-400 h-fit"
                        }
                      >
                        {relatedVote.status === "active"
                          ? "Active"
                          : relatedVote.status === "upcoming"
                          ? "Upcoming"
                          : "Closed"}
                      </Badge>
                      <div>
                        <h3 className="font-medium text-white">
                          {relatedVote.title}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-2">
                          {relatedVote.description}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <User className="h-3 w-3 text-slate-500" />
                          <span className="text-xs text-slate-500">
                            {relatedVote.creator.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              {votes.filter(
                (v) => v.id !== vote.id && v.category === vote.category
              ).length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-800 p-4 text-center">
                  <p className="text-sm text-slate-400">
                    No related votes found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Messages */}
      {voteError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{voteError}</AlertDescription>
        </Alert>
      )}
      {tallyError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{tallyError}</AlertDescription>
        </Alert>
      )}

      {/* Tally Votes Button */}
      {vote?.status === "active" && isEligible() && (
        <Button
          onClick={handleTallyVotes}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 mt-4"
          disabled={isTallying || isTallyLoading}
        >
          {isTallying || isTallyLoading ? (
            <>Tallying Votes...</>
          ) : (
            <>Tally Votes</>
          )}
        </Button>
      )}
    </>
  );
}
