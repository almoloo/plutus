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
import { particle } from "@/components/layout/AuthProvider";
import ABI from "../../../../contract/PlutusABI.json";
import { ethers } from "ethers";
import { uploadToIPFS } from "@/lib/actions";

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

  // const [formValues, setFormValues] = useState({
  //   name: userData?.name,
  //   bio: userData?.bio,
  //   links: userData?.links,
  //   avatar: userData?.avatar,
  //   cover: userData?.cover,
  // });

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: userData?.name ?? auth?.user?.name ?? "",
  //     bio: userData?.bio ?? "",
  //     links: JSON.parse(userData?.links ?? "[]"),
  //     avatar:
  //       userData?.avatar !== ""
  //         ? userData?.avatar
  //         : process.env.NEXT_PUBLIC_DEFAULT_AVATAR,
  //     cover:
  //       userData?.cover !== ""
  //         ? userData?.cover
  //         : process.env.NEXT_PUBLIC_DEFAULT_COVER,
  //   },
  // });

  // const { register } = form;

  // useEffect(() => {
  //   setFormValues({
  //     name: form.getValues().name,
  //     avatar: form.getValues().avatar,
  //     cover: form.getValues().cover,
  //     bio: form.getValues().bio,
  //     links: form.getValues().links,
  //   });
  // }, [form.getValues()]);

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
      // const blob = new Blob([reader.result as string], { type: "image/png" });
      // const file = new File([blob], 'avatar.png', { type: 'image/png' });
      // setUserData({ ...userData!, avatar: URL.createObjectURL(blob) });
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
    // save data to smart contract
    const isTestnet = process.env.NEXT_PUBLIC_TESTNET === "true";
    const contractAddress = isTestnet
      ? process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS;
    // UPLOAD AVATAR AND COVER TO IPFS
    const IPFS_URL = "https://rpc.particle.network/ipfs/upload";
    if (userData?.avatar.includes("data:image")) {
      // CONVERT BASE64 TO FILE
      const blob = await fetch(userData?.avatar).then((res) => res.blob());
      const file = new File([blob], "avatar.png", { type: "image/png" });

      uploadToIPFS(file).then((res: any) => {
        setUserData({ ...userData!, avatar: res });
        console.log(" ", res);
      });
    }
    // Generate the transaction data
    // const contract = new ethers.Contract(
    //   contractAddress!,
    //   ABI,
    //   await auth?.ethersSigner()
    // );
    // const txn = await contract.RegisterUser(
    //   userData?.name,
    //   userData?.email,
    //   userData?.bio,
    //   userData?.avatar,
    //   userData?.cover,
    //   JSON.stringify(userData?.links)
    // );
    // console.log(txn);

    // console.log(auth?.ethers?.call({ to: smartContractAddress, data: "0x6d4ce63c" }));

    // console.log(await auth?.ethersSigner);
    // particle.evm.sendTransaction({
    //   to: smartContractAddress,
    //   data: "0x6d4ce63c",
    // });
    setFormLoading(false);
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
    </>
  );
}
function useAuth() {
  throw new Error("Function not implemented.");
}
