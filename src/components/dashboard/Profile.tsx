"use client";
import { SocialLink } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Link2, Loader } from "lucide-react";
import { toast } from "sonner";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import ABI from "../../../contract/PlutusABI.json";

interface Props {
  isDummy?: boolean;
  cover: string;
  avatar: string;
  name: string;
  description?: string;
  links?: SocialLink[];
  address: string;
  className?: string;
  tiny?: boolean;
}

const handleCopyAddress = (address: string) => {
  try {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${address}`
    );
  } catch (error) {
    toast.error("Failed to copy address");
  } finally {
    toast.success("Address copied to clipboard");
  }
};

export default function Profile(props: Props) {
  const auth = useContext(AuthContext);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [canDonate, setCanDonate] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [loadingDonate, setLoadingDonate] = useState(false);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      setCanDonate(true);
    }
  }, [auth?.isAuthenticated]);

  const handleLogin = async () => {
    setLoadingLogin(true);
    try {
      await auth?.login();
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
    } finally {
      setLoadingLogin(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleDonate = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth?.isAuthenticated) {
      toast.error("Please login to donate");
      return;
    }
    if (loadingDonate) return;
    setLoadingDonate(true);
    let amount = parseFloat(donateAmount);
    const address = props.address;
    if (isNaN(amount) || amount <= 0 || donateAmount === "") {
      toast.error("Invalid amount");
      return;
    }
    try {
      const isTestnet = process.env.NEXT_PUBLIC_TESTNET === "true";
      const contractAddress = isTestnet
        ? process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS
        : process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS;

      const contract = new ethers.Contract(
        contractAddress!,
        ABI,
        await auth?.ethersSigner()
      );

      const txn = await contract.Donate(address, {
        value: ethers.parseEther(amount.toString()),
      });
      console.log(txn);
      setDonateAmount("");
      toast.success("Donation successful. Thank you! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Failed to donate");
    } finally {
      setLoadingDonate(false);
    }
  };

  return (
    <>
      <section
        className={`relative w-full overflow-hidden rounded-lg border @5xl:grid @5xl:grid-cols-3 @5xl:grid-rows-1 ${props.className}`}
      >
        {props.tiny && (
          <Link
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/${props.address}`}
            className="absolute bottom-0 left-0 right-0 top-0 z-10"
          ></Link>
        )}
        <div className="@5xl:col-span-2">
          {/* ----- COVER IMAGE ----- */}
          <div className="relative aspect-video">
            <Image
              // loader={imageLoader}
              src={props.cover}
              alt={props.name}
              className="h-full w-full bg-neutral-50 object-cover object-center"
              width="640"
              height="360"
              unoptimized
            />
            {!props.isDummy && !props.tiny && (
              <div className="absolute left-0 right-0 top-0 flex justify-end p-5">
                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleCopyAddress(props.address)}
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Copy Address
                </Button>
              </div>
            )}
          </div>
          {/* ----- AVATAR AND NAME ----- */}
          <div className="-mb-12 flex -translate-y-1/2 items-end px-4">
            <Image
              // loader={imageLoader}
              src={props.avatar}
              alt={props.name}
              className={`${
                props.tiny ? "h-20 w-20" : "h-24 w-24"
              } rounded-full border-4 border-white bg-neutral-50`}
              width="96"
              height="96"
              unoptimized
            />
            <div
              className={`${
                props.tiny ? "h-10" : "h-12"
              } flex grow items-center px-2`}
            >
              <h1 className={`${props.tiny ? "text-lg" : "text-xl"} font-bold`}>
                {props.name}
              </h1>
            </div>
          </div>
          {/* ----- DESCRIPTION ----- */}
          {props.description && (
            <div className="p-4">
              <p className="leading-relaxed">{props.description}</p>
            </div>
          )}
          {/* ----- SOCIAL LINKS ----- */}
          {props.links && !props.tiny && (
            <div className="flex flex-col gap-1 p-4">
              {props.links.map((link, index) => (
                <Link
                  key={index}
                  href={isValidUrl(link.url) ? link.url : ""}
                  className=""
                  passHref
                >
                  <Button className="w-full" variant="outline">
                    {link.title}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* ----- PAYMENT ----- */}
        {!props.tiny && (
          <div
            className={`border-t bg-neutral-50 p-4 @5xl:flex @5xl:flex-col ${
              props.isDummy && "pointer-events-none cursor-not-allowed"
            }`}
          >
            <div className="-mx-4 -mt-4 mb-5 hidden grow items-center justify-center bg-neutral-300 text-white opacity-50 @5xl:flex">
              <DollarSign className="h-[20%] w-auto" />
            </div>
            <div className="sticky bottom-0">
              <h2 className="font-medium">Payment</h2>
              <small className="text-sm text-neutral-600">
                Support me by donating some Avax.
              </small>
              <form className="mt-4 flex gap-2" onSubmit={handleDonate}>
                {canDonate ? (
                  <>
                    <Input
                      placeholder="Amount"
                      inputMode="decimal"
                      value={donateAmount}
                      onChange={(e) => setDonateAmount(e.target.value)}
                      disabled={loadingDonate}
                      required
                    />
                    <Button variant="outline" disabled={loadingDonate}>
                      {loadingDonate && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Donate
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleLogin}
                    type="button"
                  >
                    {loadingLogin && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Login to donate
                  </Button>
                )}
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
