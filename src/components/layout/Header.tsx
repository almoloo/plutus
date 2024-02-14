"use client";
import React from "react";
import ConnectButton from "./ConnectButton";
import Link from "next/link";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"] });

export default function Header() {
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
        <nav className="ml-auto">
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
