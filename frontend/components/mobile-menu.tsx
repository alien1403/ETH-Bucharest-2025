"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, LogOut, PlusCircle, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/hooks/use-wallet-context";

// Organization address with special permissions
const ORGANIZATION_ADDRESS = "0xf10358d78C58e9A540bAEbcaF3074D5A9FCf5Db9";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entityData, setEntityData] = useState({
    name: "Governance DAO",
    type: "DAO",
  });

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
        setEntityData(JSON.parse(savedEntityData));
      } catch (error) {
        console.error("Failed to parse entity data from localStorage:", error);
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

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsAuthenticated(false);
      onClose();
      // Redirect to homepage when disconnecting
      router.push("/");
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="container mx-auto px-4 py-4 bg-slate-900 border-b border-slate-800">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={onClose}
          >
            How It Works
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={onClose}
          >
            Features
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={onClose}
          >
            FAQ
          </Link>
          <Link
            href="/votes"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={onClose}
          >
            Votes
          </Link>
          <Link
            href="/wallet-demo"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={onClose}
          >
            Wallet Demo
          </Link>

          <Separator className="bg-slate-800" />

          {isAuthenticated ? (
            <>
              {/* Only show wallet address for non-organization users */}
              {!hasOrganizationAccess && isConnected && address && (
                <div className="flex items-center gap-2 py-2">
                  <Wallet className="h-4 w-4 text-purple-400" />
                  <p className="text-sm font-mono text-slate-300">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                </div>
              )}

              {/* Only show organization menu items if user has organization access */}
              {hasOrganizationAccess && (
                <>
                  <div className="py-2 px-1 text-sm font-medium text-slate-400">
                    {entityData.name}
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center text-sm font-medium text-slate-300 hover:text-white py-2"
                    onClick={onClose}
                  >
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    Profile
                  </Link>
                  <Link
                    href="/create-vote"
                    className="flex items-center text-sm font-medium text-slate-300 hover:text-white py-2"
                    onClick={onClose}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-purple-400" />
                    Create Vote
                  </Link>
                </>
              )}

              <Link
                href="/wallet-demo"
                className="flex items-center text-sm font-medium text-slate-300 hover:text-white py-2"
                onClick={onClose}
              >
                <Wallet className="mr-2 h-4 w-4 text-purple-400" />
                Wallet Demo
              </Link>

              {/* Show disconnect button for all authenticated users */}
              <button
                className="flex items-center text-sm font-medium text-red-400 hover:text-red-300 py-2"
                onClick={handleDisconnect}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </button>
            </>
          ) : (
            <>
              <Link href="/register" onClick={onClose}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400 mb-3"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Register as Entity
                </Button>
              </Link>
              <Link href="/wallet-demo" onClick={onClose}>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
