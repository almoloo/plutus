"use client";
import type { AuthContextType, User } from "@/lib/definitions";
import { createContext, useEffect, useState } from "react";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { AvalancheTestnet, Avalanche } from "@particle-network/chains";
import { ethers } from "ethers";
import type { BrowserProvider, JsonRpcSigner } from "ethers";
import { createUser, getUser } from "@/lib/actions";

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
// let ethersSigner: Promise<JsonRpcSigner> | null = null;
// if (typeof window !== "undefined") {
ethersProvider = new ethers.BrowserProvider(particleProvider, "any");
//   ethersSigner = ethersProvider.getSigner();
// }

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const handleLogin = async () => {
    try {
      const userInfo = await particle.auth.login({
        preferredAuthType: "google",
      });
      await connect();
      return userInfo;
    } catch (error) {
      console.error(error);
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

  const getUserInfo = async () => {
    try {
      const userInfo = await particle.auth.getUserInfo();
      return userInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const [authInfo, setAuthInfo] = useState<AuthContextType | null>({
    isAuthenticated: false,
    user: null,
    getUserInfo,
    ethers: ethersProvider,
    ethersSigner: () => null,
    login: handleLogin,
    logout: handleLogout,
  });

  const connect = async () => {
    if (particle.auth.isLogin()) {
      const userInfo = await particle.auth.getUserInfo();
      console.log("🔥", userInfo);
      const user: User = {
        uuid: userInfo?.uuid!,
        email: userInfo?.google_email,
        address: userInfo?.wallets[0].public_address!,
        name: userInfo?.name,
      };
      setAuthInfo({
        isAuthenticated: true,
        user,
        getUserInfo,
        ethers: ethersProvider,
        ethersSigner: () => ethersProvider?.getSigner() ?? null,
        login: handleLogin,
        logout: handleLogout,
      });
      const userExists = await getUser(user.uuid);
      if (!userExists) {
        const createdUser = await createUser(user);
        console.log("🎾", createdUser);
      }
    } else {
      setAuthInfo({
        isAuthenticated: false,
        user: null,
        getUserInfo,
        ethers: ethersProvider,
        ethersSigner: () => ethersProvider?.getSigner() ?? null,
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
