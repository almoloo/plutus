"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader, LogOut } from "lucide-react";

export default function ConnectButton({ size }: { size?: string }) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      {auth?.isAuthenticated ? (
        <Button variant="ghost" onClick={handleDisconnect} disabled={loading}>
          {loading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          Sign out
        </Button>
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
