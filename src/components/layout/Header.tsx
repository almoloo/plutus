"use client";
import React, { useContext } from "react";
import ConnectButton from "@/components/layout/ConnectButton";
import Link from "next/link";
import { Exo_2 } from "next/font/google";
import { AuthContext } from "@/components/layout/AuthProvider";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, SquareUserRound } from "lucide-react";

const exo2 = Exo_2({ subsets: ["latin"] });

export default function Header() {
  const auth = useContext(AuthContext);
  return (
    <header className="flex items-center justify-between border-b py-5">
      <div className="container flex items-center">
        {/* ----- LOGO ----- */}
        <Link
          href="/"
          className={`group flex items-center cursor-pointer ${exo2.className}`}
        >
          <span className="mr-1 inline-block h-5 w-1 rounded-sm bg-emerald-500"></span>
          <span className="mr-2 inline-block h-5 w-4 rounded-sm bg-emerald-500 transition-colors group-hover:bg-emerald-400"></span>
          <strong className="text-2xl font-semibold text-neutral-800">
            Plutus
          </strong>
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          {auth?.isAuthenticated && (
            <>
              <Link href="/dashboard" className="hidden md:block" passHref>
                <Button variant="ghost" className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link
                href="/dashboard/profile"
                className="hidden md:block"
                passHref
              >
                <Button variant="ghost" className="cursor-pointer">
                  <SquareUserRound className="mr-2 h-4 w-4" />
                  Your Profile
                </Button>
              </Link>
            </>
          )}
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
