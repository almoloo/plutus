"use client";
import Profile from "@/components/dashboard/Profile";
import { getUserData } from "@/lib/data";
import { SocialLink } from "@/lib/definitions";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileInfo {
  cover: string;
  avatar: string;
  name: string;
  description?: string;
  links?: SocialLink[];
  address: string;
}

export default function page({ params }: { params: { address: string } }) {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.address) {
      router.push("/");
    }
    const prepareProfile = async () => {
      try {
        const profileInfo = await getUserData(params.address);
        if (!profileInfo) {
          router.push("/");
        }
        setProfileInfo({
          cover: profileInfo?.cover!,
          avatar: profileInfo?.avatar!,
          name: profileInfo?.name!,
          description: profileInfo?.bio,
          links: profileInfo?.links,
          address: params.address,
        });
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    prepareProfile();
  }, [router, params.address]);
  return (
    <div className="container my-5 grid-cols-5 justify-center lg:grid">
      <div className="flex flex-col lg:col-span-3 lg:col-start-2">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader size={64} className="animate-spin" />
          </div>
        ) : (
          <Profile
            address={profileInfo?.address!}
            avatar={`https://ipfs.particle.network/${profileInfo?.avatar}`}
            cover={`https://ipfs.particle.network/${profileInfo?.cover}`}
            name={profileInfo?.name!}
            description={profileInfo?.description}
            links={profileInfo?.links}
          />
        )}
      </div>
    </div>
  );
}
