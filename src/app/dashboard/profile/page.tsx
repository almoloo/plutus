"use client";
import Profile from "@/components/dashboard/Profile";
import { AuthContext } from "@/components/layout/AuthProvider";
import { useContext, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/definitions";
import { Textarea } from "@/components/ui/textarea";
import { getUserData } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import SocialLinkField from "@/components/dashboard/SocialLinkField";
import { Loader } from "lucide-react";
import ABI from "../../../../contract/PlutusABI.json";
import { ethers } from "ethers";
import { uploadToIPFS } from "@/lib/actions";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function page() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>({
    name: auth?.user?.name ?? "",
    email: auth?.user?.email ?? "",
    bio: "",
    avatar: process.env.NEXT_PUBLIC_DEFAULT_AVATAR!,
    cover: process.env.NEXT_PUBLIC_DEFAULT_COVER!,
    links: [],
  });
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  useEffect(() => {
    const getUser = async (address: string) => {
      if (auth?.user?.address) {
        try {
          const savedData = await getUserData(address);
          if (savedData) {
            setUserData(savedData);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingUserData(false);
        }
      }
    };
    getUser(auth?.user?.address!);
  }, [router, auth]);

  const handleAddLink = () => {
    setUserData({
      ...userData!,
      links: [
        ...userData!.links,
        {
          title: "",
          url: "",
        },
      ],
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData!, avatar: reader.result as string });
    };
    reader.readAsDataURL(file!);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData!, cover: reader.result as string });
    };
    reader.readAsDataURL(file!);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setLoadingMessage("Preparing to update your profile");
    // save data to smart contract
    const isTestnet = process.env.NEXT_PUBLIC_TESTNET === "true";
    const contractAddress = isTestnet
      ? process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS;

    const dataToSubmit = {
      name: userData?.name,
      email: userData?.email,
      bio: userData?.bio,
      avatar: userData?.avatar,
      cover: userData?.cover,
      links: userData?.links,
    };

    // UPLOAD AVATAR AND COVER TO IPFS
    const IPFS_URL = "https://rpc.particle.network/ipfs/upload";
    const convertB64toFile = async (b64: string, filename: string) => {
      const blob = await fetch(b64).then((res) => res.blob());
      const file = new File([blob], filename, { type: "image/png" });
      return file;
    };
    try {
      if (dataToSubmit?.avatar?.includes("data:image")) {
        setLoadingMessage("Uploading avatar to IPFS");
        const avatarFile = await convertB64toFile(
          dataToSubmit?.avatar,
          `${auth?.user?.address}-avatar.png`
        );
        const avatarFormData = new FormData();
        avatarFormData.append("file", avatarFile);

        const avatarResponse = await uploadToIPFS(avatarFormData);
        if (avatarResponse === null) {
          throw new Error("Error uploading avatar image to IPFS");
        }
        setUserData({ ...userData!, avatar: await avatarResponse.cid });
        dataToSubmit.avatar = await avatarResponse.cid;
        console.log("🪁", "avatarResponse", avatarResponse);
      }

      if (dataToSubmit?.cover?.includes("data:image")) {
        setLoadingMessage("Uploading cover to IPFS");
        const coverFile = await convertB64toFile(
          dataToSubmit?.cover!,
          `${auth?.user?.address}-cover.png`
        );
        const coverFormData = new FormData();
        coverFormData.append("file", coverFile);

        const coverResponse = await uploadToIPFS(coverFormData);
        if (coverResponse === null) {
          throw new Error("Error uploading cover image to IPFS");
        }
        setUserData({ ...userData!, cover: await coverResponse.cid });
        dataToSubmit.cover = await coverResponse.cid;
        console.log("🪁", "coverResponse", coverResponse);
      }

      console.log("🪁", "userData", userData);

      console.log(dataToSubmit);

      const contract = new ethers.Contract(
        contractAddress!,
        ABI,
        await auth?.ethersSigner()
      );

      console.log("🪁", "contract", contract);

      setLoadingMessage(
        "Updating your profile on the blockchain, Click 'Continue' on the popup"
      );
      const txn = await contract.RegisterUser(
        dataToSubmit?.name,
        dataToSubmit?.email,
        dataToSubmit?.bio,
        dataToSubmit?.avatar,
        dataToSubmit?.cover,
        JSON.stringify(dataToSubmit?.links)
      );
      console.log(txn);
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      toast.success("Profile updated successfully");
      setFormLoading(false);
    }
  };
  return (
    <>
      {/* <p>{JSON.stringify(userData)}</p> */}
      <div className="container my-16">
        <div className="grid grid-cols-6 gap-5">
          <section className="col-span-3">
            <div className="mb-5">
              <h2 className="mb-2 text-2xl font-bold">
                Welcome to your Plutus profile
              </h2>
              <span className="text-neutral-600">
                Edit and store your personal information securely using
                Avalanche smart contracts.
              </span>
            </div>
            {loadingUserData ? (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[120px] w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-1/4" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
                <Skeleton className="h-[40px] w-1/5" />
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* ----- NAME ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={userData?.name}
                    autoComplete="name"
                    onChange={(e) =>
                      setUserData({ ...userData!, name: e.target.value })
                    }
                    disabled={formLoading}
                    required
                  />
                </fieldset>
                {/* ----- Email ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Public Email
                  </label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData({ ...userData!, email: e.target.value })
                    }
                    disabled={formLoading}
                  />
                </fieldset>
                {/* ----- BIO ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    rows={5}
                    value={userData?.bio}
                    onChange={(e) =>
                      setUserData({ ...userData!, bio: e.target.value })
                    }
                    disabled={formLoading}
                  />
                </fieldset>
                {/* ----- SOCIAL LINKS ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Social Links</label>
                  {userData?.links.map((link, index) => (
                    <SocialLinkField
                      url={link.url}
                      title={link.title}
                      change={(data) => {
                        const newLinks = userData?.links;
                        newLinks[index] = data;
                        setUserData({
                          ...userData!,
                          links: newLinks,
                        });
                      }}
                      deleteItem={() => {
                        const newLinks = userData?.links;
                        newLinks.splice(index, 1);
                        setUserData({
                          ...userData!,
                          links: newLinks,
                        });
                      }}
                      key={index}
                      disabled={formLoading}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddLink}
                    disabled={formLoading}
                  >
                    Add Link
                  </Button>
                </fieldset>

                {/* ----- AVATAR ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="avatar">
                    Avatar
                  </label>
                  <Input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                    disabled={formLoading}
                  />
                  <Input
                    type="hidden"
                    value={userData?.avatar}
                    onChange={(e) =>
                      setUserData({ ...userData!, avatar: e.target.value })
                    }
                  />
                </fieldset>
                {/* ----- COVER ----- */}
                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="cover">
                    Cover
                  </label>
                  <Input
                    type="file"
                    id="cover"
                    onChange={handleCoverChange}
                    disabled={formLoading}
                  />
                  <Input
                    type="hidden"
                    value={userData?.cover}
                    onChange={(e) =>
                      setUserData({ ...userData!, cover: e.target.value })
                    }
                  />
                </fieldset>
                <div>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save changes
                  </Button>
                </div>
              </form>
            )}
          </section>
          <section className="col-span-3">
            {loadingUserData ? (
              <Skeleton className="h-2/3" />
            ) : (
              <Profile
                isDummy
                cover={
                  userData?.cover.includes("data:image")
                    ? userData?.cover
                    : `https://ipfs.particle.network/${userData?.cover}`
                }
                avatar={
                  userData?.avatar.includes("data:image")
                    ? userData?.avatar
                    : `https://ipfs.particle.network/${userData?.avatar}`
                }
                name={userData?.name!}
                description={userData?.bio}
                links={userData?.links}
                address={auth?.user?.address!}
              />
            )}
          </section>
        </div>
      </div>
      {formLoading && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-slate-900/50">
            <Alert className="mx-5 w-3/4 max-w-full lg:w-[500px]">
              <Loader className="h-4 w-4 animate-spin" />
              <AlertTitle>Updating your profile</AlertTitle>
              <AlertDescription>{loadingMessage}</AlertDescription>
            </Alert>
          </div>
        </>
      )}
    </>
  );
}
function useAuth() {
  throw new Error("Function not implemented.");
}
