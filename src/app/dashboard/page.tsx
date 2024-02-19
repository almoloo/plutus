"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { getAllEvents, getAllTransactions } from "@/lib/data";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Profile from "@/components/dashboard/Profile";
import { ParsedNewDonationEvent, ParsedNewUserEvent } from "@/lib/definitions";
import DonationInfo from "@/components/dashboard/DonationInfo";

export default function page() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<{
    newUsers: ParsedNewUserEvent[];
    newDonations: ParsedNewDonationEvent[];
  } | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await getAllEvents();
        setAllEvents(events);
        console.log(events);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch events");
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, [auth?.user?.address]);
  return (
    <div className="container my-5 flex grow flex-col">
      {loading ? (
        <div className="m-auto">
          <Loader size={64} className="animate-spin" />
        </div>
      ) : error ? (
        <div className="m-auto">
          <Alert className="w-[400px]">
            <ExclamationTriangleIcon className="h-4 w-4 stroke-rose-300" />
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>
              {"You can try "}
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={() => router.refresh()}
              >
                reloading
              </Button>
              {" the page"}
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
          <section>
            <h1 className="mb-5 text-xl font-bold">New Users</h1>
            <div className="gap-5 lg:grid lg:grid-cols-8">
              {allEvents?.newUsers.map((user, index) => (
                <Profile
                  className="col-span-2"
                  address={user.address}
                  avatar={`https://ipfs.particle.network/${user.avatar}`}
                  cover={`https://ipfs.particle.network/${user.cover}`}
                  name={user.name}
                  description={user.bio}
                  tiny
                  key={index}
                />
              ))}
            </div>
          </section>
          <section className="mt-8">
            <h1 className="mb-5 text-xl font-bold">Latest Donations</h1>
            <div className="gap-5 lg:grid lg:grid-cols-8">
              {allEvents?.newDonations.map((donation, index) => (
                <DonationInfo
                  className="col-span-2"
                  from={donation.from}
                  to={donation.to}
                  amount={donation.amount}
                  key={index}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
