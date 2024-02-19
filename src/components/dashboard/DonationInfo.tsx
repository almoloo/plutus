"use client";

import { getUserData } from "@/lib/data";
import { UserData } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  from: string;
  to: string;
  amount: any;
  className?: string;
}

export default function DonationInfo({ from, to, amount, className }: Props) {
  const [loading, setLoading] = useState(false);
  // const [fromProfileData, setFromProfileData] = useState<UserData | null>(null);
  // const [toProfileData, setToProfileData] = useState<UserData | null>(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const fromProfile = await getUserData(from);
  //       setFromProfileData(fromProfile);

  //       const toProfile = await getUserData(to);
  //       setToProfileData(toProfile);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <div
      className={`${className} grid grid-cols-1 grid-rows-5 border rounded-lg aspect-video `}
    >
      {loading ? (
        <Loader className="row-span-5 m-auto h-8 w-8 animate-spin" />
      ) : (
        <>
          <div className="relative row-span-2 flex items-start justify-center border-b border-dashed p-4">
            <Link
              href={
                process.env.NEXT_PUBLIC_TESTNET === "true"
                  ? `https://testnet.snowtrace.io/address/${from}?chainId=43113`
                  : `https://snowtrace.io/address/${from}?chainId=43114`
              }
              className="max-w-full"
              target="_blank"
            >
              <code className="block max-w-full truncate text-xs">{from}</code>
            </Link>
            <div className="absolute left-1/2 top-full flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white p-2">
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
          <div className="row-span-2 flex items-end justify-center border-b p-4">
            <Link
              href={
                process.env.NEXT_PUBLIC_TESTNET === "true"
                  ? `https://testnet.snowtrace.io/address/${to}?chainId=43113`
                  : `https://snowtrace.io/address/${to}?chainId=43114`
              }
              className="max-w-full"
              target="_blank"
            >
              <code className="block max-w-full truncate text-xs">{to}</code>
            </Link>
          </div>
          <div className="row-span-1 flex items-center justify-center bg-neutral-50 text-sm">
            {parseFloat(amount) * 0.000000000000000001} AVAX
          </div>
        </>
      )}
    </div>
  );
}
