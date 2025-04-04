// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Calendar,
//   Clock,
//   Filter,
//   Search,
//   Shield,
//   Wallet,
//   User,
//   Check,
//   Lock,
//   Users,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { SiteLayout } from "@/components/site-layout";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useWallet } from "@/hooks/use-wallet-context";

// interface Vote {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   endTime?: string;
//   startTime?: string;
//   participation?: number;
//   category: string;
//   creator: {
//     name: string;
//     type: string;
//     id: string;
//   };
//   eligibleWallets?: string[];
//   result?: string;
// }

// // Mock data for votes
// const MOCK_VOTES = [
//   {
//     id: "1",
//     title: "Protocol Upgrade Proposal",
//     description:
//       "Vote on the proposed upgrade to the protocol's core functionality",
//     status: "active",
//     endTime: "2d 14h",
//     participation: 42,
//     category: "Protocol",
//     creator: {
//       name: "Protocol Team",
//       type: "Core Team",
//       id: "team-1",
//     },
//     eligibleWallets: [
//       "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
//       "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
//       "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
//       "0xf10358d78C58e9A540bAEbcaF3074D5A9FCf5Db9",
//     ],
//   },
//   {
//     id: "2",
//     title: "Treasury Allocation Q2",
//     description:
//       "Decide how to allocate the treasury funds for the second quarter",
//     status: "active",
//     endTime: "5d 8h",
//     participation: 38,
//     category: "Treasury",
//     creator: {
//       name: "Finance DAO",
//       type: "DAO",
//       id: "dao-1",
//     },
//     eligibleWallets: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"],
//   },
//   {
//     id: "3",
//     title: "New Governance Structure",
//     description: "Vote on the proposed changes to the governance structure",
//     status: "upcoming",
//     startTime: "3d 10h",
//     category: "Governance",
//     creator: {
//       name: "Governance Council",
//       type: "Council",
//       id: "council-1",
//     },
//     eligibleWallets: ["0x2546BcD3c84621e976D8185a91A922aE77ECEc30"],
//   },
//   {
//     id: "4",
//     title: "Community Fund Distribution",
//     description:
//       "Determine how to distribute the community fund to various projects",
//     status: "active",
//     endTime: "1d 6h",
//     participation: 56,
//     category: "Treasury",
//     creator: {
//       name: "Community DAO",
//       type: "DAO",
//       id: "dao-2",
//     },
//     eligibleWallets: ["0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE"],
//   },
//   {
//     id: "5",
//     title: "Parameter Adjustment",
//     description: "Adjust the key parameters of the protocol",
//     status: "closed",
//     result: "Approved",
//     participation: 64,
//     category: "Protocol",
//     creator: {
//       name: "Protocol Team",
//       type: "Core Team",
//       id: "team-1",
//     },
//     eligibleWallets: [],
//   },
//   {
//     id: "6",
//     title: "New Feature Implementation",
//     description: "Vote on whether to implement the proposed new feature",
//     status: "closed",
//     result: "Rejected",
//     participation: 72,
//     category: "Protocol",
//     creator: {
//       name: "Development DAO",
//       type: "DAO",
//       id: "dao-3",
//     },
//     eligibleWallets: [],
//   },
// ];

// export default function VotesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [votes, setVotes] = useState(MOCK_VOTES);
//   const { address, isConnected } = useWallet();

//   // Load votes from local storage
//   useEffect(() => {
//     const createdVotes = JSON.parse(
//       localStorage.getItem("createdVotes") || "[]"
//     );
//     if (createdVotes.length > 0) {
//       // Combine mock votes with created votes
//       setVotes([...createdVotes, ...MOCK_VOTES]);
//     }
//   }, []);

//   // Filter votes based on search query and category
//   const filteredVotes = votes.filter((vote) => {
//     const matchesSearch =
//       vote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       vote.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory
//       ? vote.category === selectedCategory
//       : true;
//     return matchesSearch && matchesCategory;
//   });

//   // Check if user is eligible to vote
//   const isEligible = (vote: Vote) => {
//     if (!address || !vote) return false;
//     return vote.eligibleWallets?.includes(address) || false;
//   };

//   // Get unique categories for filter
//   const categories = Array.from(new Set(votes.map((vote) => vote.category)));

//   return (
//     <>
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
//           Votes
//         </h1>
//         <p className="mt-2 text-slate-400">
//           Browse and participate in confidential votes secured by fully
//           homomorphic encryption
//         </p>

//         {isConnected && address && (
//           <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
//             <div className="flex items-center gap-2">
//               <Wallet className="h-4 w-4 text-purple-400" />
//               <p className="text-sm text-slate-300">
//                 Connected with{" "}
//                 <span className="font-mono text-purple-400">
//                   {address.slice(0, 6)}...{address.slice(-4)}
//                 </span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Filters and Search */}
//       <div className="mb-8 space-y-4">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full sm:max-w-xs">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
//             <Input
//               type="search"
//               placeholder="Search votes..."
//               className="pl-8 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <Filter className="h-4 w-4 text-slate-400" />
//             <span className="text-sm text-slate-400">Filter by:</span>
//             <div className="flex flex-wrap gap-2">
//               <Badge
//                 variant="outline"
//                 className={`cursor-pointer ${
//                   selectedCategory === null
//                     ? "bg-purple-500/20 text-purple-400 border-purple-500"
//                     : "border-slate-700 text-slate-400"
//                 }`}
//                 onClick={() => setSelectedCategory(null)}
//               >
//                 All
//               </Badge>
//               {categories.map((category) => (
//                 <Badge
//                   key={category}
//                   variant="outline"
//                   className={`cursor-pointer ${
//                     selectedCategory === category
//                       ? "bg-purple-500/20 text-purple-400 border-purple-500"
//                       : "border-slate-700 text-slate-400"
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Votes Tabs */}
//       <Tabs defaultValue="active" className="w-full">
//         <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 mb-6">
//           <TabsTrigger
//             value="active"
//             className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
//           >
//             Active
//           </TabsTrigger>
//           <TabsTrigger
//             value="upcoming"
//             className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
//           >
//             Upcoming
//           </TabsTrigger>
//           <TabsTrigger
//             value="closed"
//             className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
//           >
//             Closed
//           </TabsTrigger>
//         </TabsList>

//         {/* Active Votes */}
//         <TabsContent value="active" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredVotes
//               .filter((vote) => vote.status === "active")
//               .map((vote) => (
//                 <Link href={`/votes/${vote.id}`} key={vote.id}>
//                   <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
//                     <CardHeader className="pb-2">
//                       <div className="flex items-center justify-between">
//                         <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
//                           Active
//                         </Badge>
//                         <div className="flex items-center gap-1 text-sm text-slate-400">
//                           <Clock className="h-3.5 w-3.5" />
//                           <span>{vote.endTime}</span>
//                         </div>
//                       </div>
//                       <CardTitle className="mt-2 text-lg text-white">
//                         {vote.title}
//                       </CardTitle>
//                       <CardDescription className="text-slate-400">
//                         {vote.description}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="pb-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-slate-400">Participation</span>
//                         <span className="font-medium text-white">
//                           {vote.participation}%
//                         </span>
//                       </div>
//                       <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
//                         <div
//                           className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
//                           style={{ width: `${vote.participation}%` }}
//                         ></div>
//                       </div>

//                       <div className="mt-4 flex items-center justify-between">
//                         <div className="flex items-center gap-1.5">
//                           <User className="h-3.5 w-3.5 text-slate-400" />
//                           <span className="text-xs text-slate-400">
//                             Created by
//                           </span>
//                           <span className="text-xs text-white">
//                             {vote.creator.name}
//                           </span>
//                         </div>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <div>
//                                 {isEligible(vote) ? (
//                                   <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
//                                     <Check className="h-3 w-3 mr-1" />
//                                     Eligible
//                                   </Badge>
//                                 ) : (
//                                   <Badge
//                                     variant="outline"
//                                     className="border-slate-700 text-slate-400"
//                                   >
//                                     Not Eligible
//                                   </Badge>
//                                 )}
//                               </div>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               {isEligible(vote)
//                                 ? "Your wallet is eligible to vote on this proposal"
//                                 : "Your wallet is not on the eligibility list for this vote"}
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <div className="flex w-full items-center justify-between">
//                         <Badge
//                           variant="outline"
//                           className="border-slate-700 text-slate-400"
//                         >
//                           {vote.category}
//                         </Badge>
//                         <div className="flex items-center gap-1 text-purple-400 text-sm font-medium">
//                           {isEligible(vote) ? "Vote now" : "View details"}
//                           <ArrowRight className="h-3.5 w-3.5" />
//                         </div>
//                       </div>
//                     </CardFooter>
//                   </Card>
//                 </Link>
//               ))}
//           </div>
//           {filteredVotes.filter((vote) => vote.status === "active").length ===
//             0 && (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="rounded-full bg-slate-800/50 p-3">
//                 <Search className="h-6 w-6 text-slate-400" />
//               </div>
//               <h3 className="mt-4 text-lg font-medium text-white">
//                 No active votes found
//               </h3>
//               <p className="mt-2 text-slate-400">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           )}
//         </TabsContent>

//         {/* Upcoming Votes */}
//         <TabsContent value="upcoming" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredVotes
//               .filter((vote) => vote.status === "upcoming")
//               .map((vote) => (
//                 <Link href={`/votes/${vote.id}`} key={vote.id}>
//                   <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
//                     <CardHeader className="pb-2">
//                       <div className="flex items-center justify-between">
//                         <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
//                           Upcoming
//                         </Badge>
//                         <div className="flex items-center gap-1 text-sm text-slate-400">
//                           <Clock className="h-3.5 w-3.5" />
//                           <span>Starts in {vote.startTime}</span>
//                         </div>
//                       </div>
//                       <CardTitle className="mt-2 text-lg text-white">
//                         {vote.title}
//                       </CardTitle>
//                       <CardDescription className="text-slate-400">
//                         {vote.description}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="pb-2">
//                       <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-3 text-center text-sm text-slate-400">
//                         <Clock className="h-4 w-4 text-blue-400" />
//                         <span>Voting will open in {vote.startTime}</span>
//                       </div>

//                       <div className="mt-4 flex items-center justify-between">
//                         <div className="flex items-center gap-1.5">
//                           <User className="h-3.5 w-3.5 text-slate-400" />
//                           <span className="text-xs text-slate-400">
//                             Created by
//                           </span>
//                           <span className="text-xs text-white">
//                             {vote.creator.name}
//                           </span>
//                         </div>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <div>
//                                 {isEligible(vote) ? (
//                                   <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
//                                     <Check className="h-3 w-3 mr-1" />
//                                     Eligible
//                                   </Badge>
//                                 ) : (
//                                   <Badge
//                                     variant="outline"
//                                     className="border-slate-700 text-slate-400"
//                                   >
//                                     Not Eligible
//                                   </Badge>
//                                 )}
//                               </div>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               {isEligible(vote)
//                                 ? "Your wallet is eligible to vote on this proposal when it starts"
//                                 : "Your wallet is not on the eligibility list for this vote"}
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <div className="flex w-full items-center justify-between">
//                         <Badge
//                           variant="outline"
//                           className="border-slate-700 text-slate-400"
//                         >
//                           {vote.category}
//                         </Badge>
//                         <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
//                           View details
//                           <ArrowRight className="h-3.5 w-3.5" />
//                         </div>
//                       </div>
//                     </CardFooter>
//                   </Card>
//                 </Link>
//               ))}
//           </div>
//           {filteredVotes.filter((vote) => vote.status === "upcoming").length ===
//             0 && (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="rounded-full bg-slate-800/50 p-3">
//                 <Clock className="h-6 w-6 text-slate-400" />
//               </div>
//               <h3 className="mt-4 text-lg font-medium text-white">
//                 No upcoming votes found
//               </h3>
//               <p className="mt-2 text-slate-400">
//                 Check back later for new votes
//               </p>
//             </div>
//           )}
//         </TabsContent>

//         {/* Closed Votes */}
//         <TabsContent value="closed" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredVotes
//               .filter((vote) => vote.status === "closed")
//               .map((vote) => (
//                 <Link href={`/votes/${vote.id}`} key={vote.id}>
//                   <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
//                     <CardHeader className="pb-2">
//                       <div className="flex items-center justify-between">
//                         <Badge className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
//                           Closed
//                         </Badge>
//                         <Badge
//                           className={
//                             vote.result === "Approved"
//                               ? "bg-green-500/20 text-green-400"
//                               : "bg-red-500/20 text-red-400"
//                           }
//                         >
//                           {vote.result}
//                         </Badge>
//                       </div>
//                       <CardTitle className="mt-2 text-lg text-white">
//                         {vote.title}
//                       </CardTitle>
//                       <CardDescription className="text-slate-400">
//                         {vote.description}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="pb-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-slate-400">
//                           Final Participation
//                         </span>
//                         <span className="font-medium text-white">
//                           {vote.participation}%
//                         </span>
//                       </div>
//                       <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
//                         <div
//                           className={`h-full rounded-full ${
//                             vote.result === "Approved"
//                               ? "bg-gradient-to-r from-green-600 to-green-500"
//                               : "bg-gradient-to-r from-red-600 to-red-500"
//                           }`}
//                           style={{ width: `${vote.participation}%` }}
//                         ></div>
//                       </div>

//                       <div className="mt-4 flex items-center justify-between">
//                         <div className="flex items-center gap-1.5">
//                           <User className="h-3.5 w-3.5 text-slate-400" />
//                           <span className="text-xs text-slate-400">
//                             Created by
//                           </span>
//                           <span className="text-xs text-white">
//                             {vote.creator.name}
//                           </span>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <div className="flex w-full items-center justify-between">
//                         <Badge
//                           variant="outline"
//                           className="border-slate-700 text-slate-400"
//                         >
//                           {vote.category}
//                         </Badge>
//                         <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
//                           View results
//                           <ArrowRight className="h-3.5 w-3.5" />
//                         </div>
//                       </div>
//                     </CardFooter>
//                   </Card>
//                 </Link>
//               ))}
//           </div>
//           {filteredVotes.filter((vote) => vote.status === "closed").length ===
//             0 && (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="rounded-full bg-slate-800/50 p-3">
//                 <Shield className="h-6 w-6 text-slate-400" />
//               </div>
//               <h3 className="mt-4 text-lg font-medium text-white">
//                 No closed votes found
//               </h3>
//               <p className="mt-2 text-slate-400">
//                 Past votes will appear here once they're completed
//               </p>
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  Search,
  Shield,
  Wallet,
  User,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWallet } from "@/hooks/use-wallet-context";

interface Vote {
  id: string;
  title: string;
  description: string;
  status: string;
  endTime?: string;
  startTime?: string;
  participation?: number;
  category: string;
  creator: {
    name: string;
    type: string;
    id: string;
  };
  eligibleWallets?: string[];
  result?: string;
  options?: { id: string; label: string; description: string }[];
  content?: string;
  createdAt?: string;
  results?: { yes: number; no: number; abstain: number };
  transactionHash?: string;
}

export default function VotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]); // Initial state is empty
  const { address, isConnected } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const createdVotes = JSON.parse(
      localStorage.getItem("createdVotes") || "[]"
    );
    if (createdVotes.length > 0) {
      setVotes(createdVotes);
    }
  }, []);

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string) as Vote;
        if (jsonData.startTime)
          jsonData.startTime = new Date(jsonData.startTime).toISOString();
        if (jsonData.endTime)
          jsonData.endTime = new Date(jsonData.endTime).toISOString();

        setVotes((prevVotes) => {
          const updatedVotes = prevVotes.filter(
            (vote) => vote.id !== jsonData.id
          );
          return [...updatedVotes, jsonData];
        });

        const createdVotes = JSON.parse(
          localStorage.getItem("createdVotes") || "[]"
        );
        const updatedCreatedVotes = createdVotes.filter(
          (vote: Vote) => vote.id !== jsonData.id
        );
        updatedCreatedVotes.push(jsonData);
        localStorage.setItem(
          "createdVotes",
          JSON.stringify(updatedCreatedVotes)
        );
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredVotes = votes.filter((vote) => {
    const matchesSearch =
      vote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? vote.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const isEligible = (vote: Vote) => {
    if (!address || !vote) return false;
    return vote.eligibleWallets?.includes(address) || false;
  };

  const categories = Array.from(new Set(votes.map((vote) => vote.category)));

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
            Votes
          </h1>
          <p className="mt-2 text-slate-400">
            Browse and participate in confidential votes secured by fully
            homomorphic encryption
          </p>

          {isConnected && address && (
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-purple-400" />
                <p className="text-sm text-slate-300">
                  Connected with{" "}
                  <span className="font-mono text-purple-400">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </p>
              </div>
            </div>
          )}
          <div className="mt-4">
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              className="hidden"
              onChange={handleJsonUpload}
            />
            <Button
              variant="outline"
              className="border-slate-700 text-slate-400 hover:bg-slate-800"
              onClick={() => fileInputRef.current?.click()}
            >
              Import Vote from JSON
            </Button>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search votes..."
                className="pl-8 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedCategory === null
                      ? "bg-purple-500/20 text-purple-400 border-purple-500"
                      : "border-slate-700 text-slate-400"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`cursor-pointer ${
                      selectedCategory === category
                        ? "bg-purple-500/20 text-purple-400 border-purple-500"
                        : "border-slate-700 text-slate-400"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 mb-6">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="closed"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Closed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVotes
                .filter((vote) => vote.status === "active")
                .map((vote) => (
                  <Link href={`/votes/${vote.id}`} key={vote.id}>
                    <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            Active
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-slate-400">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{vote.endTime || "Ongoing"}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 text-lg text-white">
                          {vote.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {vote.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Participation</span>
                          <span className="font-medium text-white">
                            {vote.participation}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                            style={{ width: `${vote.participation}%` }}
                          ></div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              Created by
                            </span>
                            <span className="text-xs text-white">
                              {vote.creator.name}
                            </span>
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  {isEligible(vote) ? (
                                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                      <Check className="h-3 w-3 mr-1" />
                                      Eligible
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="border-slate-700 text-slate-400"
                                    >
                                      Not Eligible
                                    </Badge>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {isEligible(vote)
                                  ? "Your wallet is eligible to vote on this proposal"
                                  : "Your wallet is not on the eligibility list for this vote"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full items-center justify-between">
                          <Badge
                            variant="outline"
                            className="border-slate-700 text-slate-400"
                          >
                            {vote.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-purple-400 text-sm font-medium">
                            {isEligible(vote) ? "Vote now" : "View details"}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
            {filteredVotes.filter((vote) => vote.status === "active").length ===
              0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-800/50 p-3">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  No active votes found
                </h3>
                <p className="mt-2 text-slate-400">
                  Create a new vote or import one using a JSON file.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVotes
                .filter((vote) => vote.status === "upcoming")
                .map((vote) => (
                  <Link href={`/votes/${vote.id}`} key={vote.id}>
                    <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                            Upcoming
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-slate-400">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{vote.startTime || "TBD"}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 text-lg text-white">
                          {vote.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {vote.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 p-3 text-center text-sm text-slate-400">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span>
                            Voting will open in {vote.startTime || "TBD"}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              Created by
                            </span>
                            <span className="text-xs text-white">
                              {vote.creator.name}
                            </span>
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  {isEligible(vote) ? (
                                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                      <Check className="h-3 w-3 mr-1" />
                                      Eligible
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="border-slate-700 text-slate-400"
                                    >
                                      Not Eligible
                                    </Badge>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {isEligible(vote)
                                  ? "Your wallet is eligible to vote on this proposal when it starts"
                                  : "Your wallet is not on the eligibility list for this vote"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full items-center justify-between">
                          <Badge
                            variant="outline"
                            className="border-slate-700 text-slate-400"
                          >
                            {vote.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
                            View details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
            {filteredVotes.filter((vote) => vote.status === "upcoming")
              .length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-800/50 p-3">
                  <Clock className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  No upcoming votes found
                </h3>
                <p className="mt-2 text-slate-400">
                  Create a new vote or import one using a JSON file.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVotes
                .filter((vote) => vote.status === "closed")
                .map((vote) => (
                  <Link href={`/votes/${vote.id}`} key={vote.id}>
                    <Card className="h-full border-slate-800 bg-slate-900/50 shadow-lg backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
                            Closed
                          </Badge>
                          <Badge
                            className={
                              vote.result === "Approved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {vote.result || "N/A"}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-lg text-white">
                          {vote.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {vote.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">
                            Final Participation
                          </span>
                          <span className="font-medium text-white">
                            {vote.participation}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              vote.result === "Approved"
                                ? "bg-gradient-to-r from-green-600 to-green-500"
                                : "bg-gradient-to-r from-red-600 to-red-500"
                            }`}
                            style={{ width: `${vote.participation}%` }}
                          ></div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              Created by
                            </span>
                            <span className="text-xs text-white">
                              {vote.creator.name}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full items-center justify-between">
                          <Badge
                            variant="outline"
                            className="border-slate-700 text-slate-400"
                          >
                            {vote.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                            View results
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
            {filteredVotes.filter((vote) => vote.status === "closed").length ===
              0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-800/50 p-3">
                  <Shield className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  No closed votes found
                </h3>
                <p className="mt-2 text-slate-400">
                  Create a new vote or import one using a JSON file.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
