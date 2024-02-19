"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LayoutDashboard,
  Loader,
  LogOut,
  SquareUserRound,
  X,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export default function ConnectButton({ size }: { size?: string }) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(auth?.isAuthenticated);

  useEffect(() => {
    setAuthenticated(auth?.isAuthenticated);
  }, [auth?.isAuthenticated]);

  const handleConnect = async () => {
    try {
      setLoading(true);
      await auth?.login();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      await auth?.logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {authenticated ? (
        <>
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="default" variant="outline">
                  Account
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex items-center justify-between text-left">
                  <div>
                    <DrawerTitle>Account</DrawerTitle>
                    <DrawerDescription>
                      What do you want to do today?
                    </DrawerDescription>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="outline" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                {/* <div className="p-4 pb-0">het</div> */}
                <DrawerFooter>
                  <Link href="/dashboard" passHref>
                    <Button variant="outline" size="lg" className="w-full px-3">
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="mx-auto">Dashboard</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/profile" passHref>
                    <Button variant="outline" size="lg" className="w-full px-3">
                      <SquareUserRound className="h-4 w-4" />
                      <span className="mx-auto">Your Profile</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                    disabled={loading}
                    size="lg"
                    className="px-3"
                  >
                    {loading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    <span className="mx-auto">Sign out</span>
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          {size === "lg" ? (
            <Link href="/dashboard" passHref>
              <Button variant="default" className="hidden md:flex">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to your dashboard
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              onClick={handleDisconnect}
              disabled={loading}
              className="hidden md:flex"
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Sign out
            </Button>
          )}
        </>
      ) : (
        <Button
          variant={size === "lg" ? "default" : "default"}
          onClick={handleConnect}
          disabled={loading}
          size={size === "lg" ? "lg" : "default"}
        >
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Connect with Google
        </Button>
      )}
    </>
  );
}
