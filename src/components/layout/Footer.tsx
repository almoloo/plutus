import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Ampersand } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-b bg-neutral-100 py-5">
      <div className="container flex items-center justify-between">
        <small className="flex items-center gap-1 text-xs text-neutral-700 md:text-sm">
          <Ampersand className="h-3 w-3 text-neutral-400 md:h-5 md:w-5" />
          {"Designed and developed by "}
          <Link href="https://github.com/almoloo">Ali</Link>
          {" & "}
          <Link href="https://github.com/hossein-79">Hossein</Link>
        </small>
        <Link
          href="https://github.com/almoloo/plutus"
          className="text-neutral-600 hover:text-neutral-900"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
}
