"use server";

import { ethers } from "ethers";
import ABI from "../../contract/PlutusABI.json";
import { UserData } from "@/lib/definitions";

/*
	this file is used to fetch the data from the server and the smart contract
*/
const isTestnet = process.env.NEXT_PUBLIC_TESTNET === "true";
const providerURL = isTestnet
  ? process.env.INFURA_TESTNET_URL
  : process.env.INFURA_MAINNET_URL;
const contractAddress = isTestnet
  ? process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS
  : process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS;

// GET USER DATA FROM SMART CONTRACT WITH WALLET ADDRESS USING INFURA
export const getUserData = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(providerURL);
  const contract = new ethers.Contract(contractAddress!, ABI, provider);
  const data = await contract.GetUser(address);
  console.log("🪁", "zzz", data);
  const userExists = data[6];
  let userData: UserData = {
    name: "",
    avatar: "",
    cover: "",
    email: "",
    bio: "",
    links: [],
  };
  if (!userExists) {
    return null;
  }
  userData = {
    name: data[0],
    email: data[1],
    bio: data[2],
    avatar: data[3],
    cover: data[4],
    links: JSON.parse(data[5]),
  };
  return userData;
};
