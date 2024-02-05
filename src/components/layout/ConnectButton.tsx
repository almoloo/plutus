"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
// import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
// import { ParticleProvider } from "@particle-network/provider";
// import { AvalancheTestnet, Avalanche } from "@particle-network/chains";
// import { ethers } from "ethers";

// const selectedNetwork =
//   process.env.NEXT_PUBLIC_TESTNET === "true" ? AvalancheTestnet : Avalanche;
// const particle = new ParticleNetwork({
//   projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!,
//   clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY!,
//   appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID!,
//   chainName: selectedNetwork.name,
//   chainId: selectedNetwork.id,
//   wallet: {
//     displayWalletEntry: true,
//     defaultWalletEntryPosition: WalletEntryPosition.BR,
//     uiMode: "light",
//     supportChains: [{ id: selectedNetwork.id, name: selectedNetwork.name }],
//   },
// });

// const particleProvider = new ParticleProvider(particle.auth);

// let ethersProvider;
// let ethersSigner;
// if (typeof window !== "undefined") {
//   ethersProvider = new ethers.BrowserProvider(particleProvider, "any");
//   ethersSigner = ethersProvider.getSigner();
// }

export default function ConnectButton() {
  const auth = useContext(AuthContext);

  const handleConnect = async () => {
    try {
      auth?.login();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      auth?.logout();
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
