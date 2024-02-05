"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { useRouter } from "next/navigation";

export default function ConnectButton() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleConnect = async () => {
    try {
      await auth?.login();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await auth?.logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {auth?.isAuthenticated ? (
        <button onClick={handleDisconnect}>DisconnectButton</button>
      ) : (
        <button onClick={handleConnect}>ConnectButton</button>
      )}
    </>
  );
}
