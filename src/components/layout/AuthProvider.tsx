"use client";
import type { AuthContextType } from "@/lib/definitions";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { UserInfo } from "@particle-network/auth";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { AvalancheTestnet, Avalanche } from "@particle-network/chains";
import { ethers } from "ethers";
import type { BrowserProvider, JsonRpcSigner } from "ethers";

const selectedNetwork =
  process.env.NEXT_PUBLIC_TESTNET === "true" ? AvalancheTestnet : Avalanche;
const particle = new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID!,
  chainName: selectedNetwork.name,
  chainId: selectedNetwork.id,
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: WalletEntryPosition.BR,
    uiMode: "light",
    supportChains: [{ id: selectedNetwork.id, name: selectedNetwork.name }],
  },
});

const particleProvider = new ParticleProvider(particle.auth);

let ethersProvider: BrowserProvider | null = null;
let ethersSigner: Promise<JsonRpcSigner> | null = null;
if (typeof window !== "undefined") {
  ethersProvider = new ethers.BrowserProvider(particleProvider, "any");
  ethersSigner = ethersProvider.getSigner();
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const handleLogin = async () => {
    try {
      const userInfo = await particle.auth.login();
      await connect();
      return userInfo;
    } catch (error) {
      console.error(error);
      // return a comprehensive error

      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await particle.auth.logout();
      await connect();
    } catch (error) {
      console.error(error);
    }
  };

  const [authInfo, setAuthInfo] = useState<AuthContextType | null>({
    isAuthenticated: false,
    user: null,
    ethers: ethersProvider,
    ethersSigner: ethersSigner,
    login: handleLogin,
    logout: handleLogout,
  });

  const connect = async () => {
    if (particle.auth.isLogin()) {
      console.log("🔥", await particle.auth.getUserInfo());
      setAuthInfo({
        isAuthenticated: particle.auth.isLogin(),
        user: await particle.auth.getUserInfo(),
        ethers: ethersProvider,
        ethersSigner: ethersSigner,
        login: handleLogin,
        logout: handleLogout,
      });
    } else {
      setAuthInfo({
        isAuthenticated: particle.auth.isLogin(),
        user: null,
        ethers: ethersProvider,
        ethersSigner: ethersSigner,
        login: handleLogin,
        logout: handleLogout,
      });
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
