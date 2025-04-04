// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Lock,
//   Menu,
//   X,
//   User,
//   LogOut,
//   PlusCircle,
//   ChevronDown,
//   Building2,
//   Wallet,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { WalletHeader } from "@/components/wallet-header";
// import { useWallet } from "@/hooks/use-wallet-context";

// // Organization address with special permissions
// const ORGANIZATION_ADDRESS = "0xf10358d78C58e9A540bAEbcaF3074D5A9FCf5Db9";

// interface SiteHeaderProps {
//   mobileMenuOpen: boolean;
//   setMobileMenuOpen: (open: boolean) => void;
// }

// export function SiteHeader({
//   mobileMenuOpen,
//   setMobileMenuOpen,
// }: SiteHeaderProps) {
//   // Mock authentication state - in a real app, this would come from a context or auth provider
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [entityData, setEntityData] = useState({
//     name: "Governance DAO",
//     type: "DAO",
//   });
//   // Add state to control dropdown menu
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Get router for navigation
//   const router = useRouter();

//   // Get wallet state from our wallet context
//   const { isConnected, address, disconnect } = useWallet();

//   // Check if the current user has organization access
//   const hasOrganizationAccess = address === ORGANIZATION_ADDRESS;

//   // Load entity data from local storage
//   useEffect(() => {
//     const savedEntityData = localStorage.getItem("entityData");
//     if (savedEntityData) {
//       try {
//         setEntityData(JSON.parse(savedEntityData));
//       } catch (error) {
//         console.error("Failed to parse entity data from localStorage:", error);
//       }
//     }
//   }, []);

//   // Update authentication state based on wallet connection
//   useEffect(() => {
//     if (isConnected && address) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [isConnected, address]);

//   const entityInitials = entityData.name
//     .split(" ")
//     .map((word) => word[0])
//     .join("");

//   // Handle disconnection
//   const handleDisconnect = async () => {
//     try {
//       await disconnect();
//       setIsAuthenticated(false);
//       setDropdownOpen(false);
//       // Redirect to homepage when disconnecting
//       router.push("/");
//     } catch (error) {
//       console.error("Failed to disconnect:", error);
//     }
//   };

//   return (
//     <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
//       <div className="flex items-center gap-4">
//         <Link href="/" className="flex items-center gap-2">
//           <Lock className="h-6 w-6 text-purple-500" />
//           <span className="text-xl font-bold text-white">SecureVote</span>
//         </Link>
//       </div>

//       <nav className="hidden md:flex md:gap-4 lg:gap-6">
//         <Link
//           href="/how-it-works"
//           className="text-sm font-medium text-slate-300 hover:text-white"
//         >
//           How It Works
//         </Link>
//         <Link
//           href="/features"
//           className="text-sm font-medium text-slate-300 hover:text-white"
//         >
//           Features
//         </Link>
//         <Link
//           href="/faq"
//           className="text-sm font-medium text-slate-300 hover:text-white"
//         >
//           FAQ
//         </Link>
//         <Link
//           href="/votes"
//           className="text-sm font-medium text-slate-300 hover:text-white"
//         >
//           Votes
//         </Link>
//         <Link
//           href="/wallet-demo"
//           className="text-sm font-medium text-slate-300 hover:text-white"
//         >
//           Wallet Demo
//         </Link>
//       </nav>

//       {isAuthenticated ? (
//         <div className="hidden md:flex items-center gap-3">
//           {/* Only show wallet header for non-organization users */}
//           {!hasOrganizationAccess && <WalletHeader />}

//           {/* Only show organization dropdown if user has organization access */}
//           {hasOrganizationAccess && (
//             <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center gap-2 px-2 hover:bg-slate-800"
//                 >
//                   <Avatar className="h-8 w-8 border border-slate-700">
//                     <AvatarFallback className="bg-purple-900/50 text-purple-300">
//                       {entityInitials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <span className="text-sm font-medium text-white">
//                     {entityData.name}
//                   </span>
//                   <ChevronDown className="h-4 w-4 text-slate-400" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="w-56 bg-slate-900 border-slate-800 text-white"
//               >
//                 <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
//                   <Link
//                     href="/profile"
//                     className="flex items-center w-full"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     <User className="mr-2 h-4 w-4 text-purple-400" />
//                     <span>Profile</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
//                   <Link
//                     href="/create-vote"
//                     className="flex items-center w-full"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     <PlusCircle className="mr-2 h-4 w-4 text-purple-400" />
//                     <span>Create Vote</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
//                   <Link
//                     href="/wallet-demo"
//                     className="flex items-center w-full"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     <Wallet className="mr-2 h-4 w-4 text-purple-400" />
//                     <span>Wallet Demo</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="bg-slate-800" />
//                 <DropdownMenuItem
//                   className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
//                   onClick={handleDisconnect}
//                 >
//                   <div className="flex items-center w-full">
//                     <LogOut className="mr-2 h-4 w-4 text-red-400" />
//                     <span>Disconnect</span>
//                   </div>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       ) : (
//         <div className="hidden md:flex items-center gap-3">
//           <Link href="/register">
//             <Button
//               variant="outline"
//               className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
//             >
//               <Building2 className="mr-2 h-4 w-4" />
//               Register as Entity
//             </Button>
//           </Link>
//           <WalletHeader />
//         </div>
//       )}

//       <Button
//         variant="ghost"
//         size="icon"
//         className="md:hidden"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       >
//         {mobileMenuOpen ? (
//           <X className="h-6 w-6" />
//         ) : (
//           <Menu className="h-6 w-6" />
//         )}
//       </Button>
//     </header>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Menu,
  X,
  User,
  LogOut,
  PlusCircle,
  ChevronDown,
  Building2,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WalletHeader } from "@/components/wallet-header";
import { useWallet } from "@/hooks/use-wallet-context";

// Organization address with special permissions
const ORGANIZATION_ADDRESS = "0xf10358d78C58e9A540bAEbcaF3074D5A9FCf5Db9";

interface SiteHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function SiteHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
}: SiteHeaderProps) {
  // Mock authentication state - in a real app, this would come from a context or auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entityData, setEntityData] = useState({
    name: "Governance DAO", // Default name
    type: "DAO",
  });
  // Add state to control dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get router for navigation
  const router = useRouter();

  // Get wallet state from our wallet context
  const { isConnected, address, disconnect } = useWallet();

  // Check if the current user has organization access
  const hasOrganizationAccess = address === ORGANIZATION_ADDRESS;

  // Load entity data from local storage
  useEffect(() => {
    const savedEntityData = localStorage.getItem("entityData");
    if (savedEntityData) {
      try {
        const parsedData = JSON.parse(savedEntityData);
        // Ensure name has a fallback if undefined
        setEntityData({
          name: parsedData.name || "Governance DAO",
          type: parsedData.type || "DAO",
        });
      } catch (error) {
        console.error("Failed to parse entity data from localStorage:", error);
        // Reset to default if parsing fails
        setEntityData({ name: "Governance DAO", type: "DAO" });
      }
    }
  }, []);

  // Update authentication state based on wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isConnected, address]);

  // Safely compute entityInitials with a fallback
  const entityInitials = (entityData.name || "Governance DAO")
    .split(" ")
    .map((word) => word[0])
    .join("");

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsAuthenticated(false);
      setDropdownOpen(false);
      // Redirect to homepage when disconnecting
      router.push("/");
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Lock className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold text-white">SecureVote</span>
        </Link>
      </div>

      <nav className="hidden md:flex md:gap-4 lg:gap-6">
        <Link
          href="/how-it-works"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          How It Works
        </Link>
        <Link
          href="/features"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          Features
        </Link>
        <Link
          href="/faq"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          FAQ
        </Link>
        <Link
          href="/votes"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          Votes
        </Link>
        <Link
          href="/wallet-demo"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          Wallet Demo
        </Link>
      </nav>

      {isAuthenticated ? (
        <div className="hidden md:flex items-center gap-3">
          {/* Only show wallet header for non-organization users */}
          {!hasOrganizationAccess && <WalletHeader />}

          {/* Only show organization dropdown if user has organization access */}
          {hasOrganizationAccess && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 hover:bg-slate-800"
                >
                  <Avatar className="h-8 w-8 border border-slate-700">
                    <AvatarFallback className="bg-purple-900/50 text-purple-300">
                      {entityInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-white">
                    {entityData.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-slate-900 border-slate-800 text-white"
              >
                <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                  <Link
                    href="/profile"
                    className="flex items-center w-full"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                  <Link
                    href="/create-vote"
                    className="flex items-center w-full"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Create Vote</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                  <Link
                    href="/wallet-demo"
                    className="flex items-center w-full"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Wallet className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Wallet Demo</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem
                  className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
                  onClick={handleDisconnect}
                >
                  <div className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    <span>Disconnect</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-3">
          <Link href="/register">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Register as Entity
            </Button>
          </Link>
          <WalletHeader />
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
    </header>
  );
}
