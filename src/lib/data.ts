"use server";

import { ethers } from "ethers";
import ABI from "../../contract/PlutusABI.json";
import { UserData } from "@/lib/definitions";
import { CovalentClient, Chains } from "@covalenthq/client-sdk";

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
/**
 * Retrieves user data from the contract based on the provided address.
 * @param address - The address of the user.
 * @returns A promise that resolves to the user data if the user exists, otherwise null.
 */
export const getUserData = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(providerURL);
  const contract = new ethers.Contract(contractAddress!, ABI, provider);
  const data = await contract.GetUser(address);
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

// GET ADDRESS TRANSACTIONS FROM COVALENT SDK
/**
 * Retrieves the transactions for the provided address from the Covalent API.
 * @param address - The address of the user.
 * @returns A promise that resolves to the transactions for the provided address.
 */
export const getAddressTransactions = async (
  address: string,
  page?: number
) => {
  try {
    // const client = new CovalentClient(process.env.COVALENT_API_KEY!);
    const chain = isTestnet
      ? Chains.AVALANCHE_TESTNET
      : Chains.AVALANCHE_MAINNET;

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${process.env.COVALENT_API_KEY}`);
    const response = await fetch(
      `https://api.covalenthq.com/v1/${chain}/address/${address}/transactions_v3/page/${
        page ?? 0
      }/`,
      {
        method: "get",
        headers: headers,
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllTransactions = async (address: string) => {
  try {
    let currentPage = 0;
    let transactions: any[] = [];
    let pageTransactions = await getAddressTransactions(address, currentPage);
    while (pageTransactions?.data?.links?.next !== null) {
      const filteredTransactions = pageTransactions.data.items.filter(
        (transaction: any) =>
          transaction.from_address ===
          process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS
      );
      transactions = [...transactions, ...filteredTransactions];
      currentPage++;
      pageTransactions = await getAddressTransactions(address, currentPage);
    }
    return transactions;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllEvents = async () => {
  try {
    const iFace = new ethers.Interface(ABI);
    const chain = isTestnet
      ? Chains.AVALANCHE_TESTNET
      : Chains.AVALANCHE_MAINNET;

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${process.env.COVALENT_API_KEY}`);

    const response = await fetch(
      `https://api.covalenthq.com/v1/${chain}/events/address/${contractAddress}/?starting-block=${process.env.STARTING_BLOCK}`,
      {
        method: "get",
        headers: headers,
      }
    );
    const data = await response.json();
    const events = data.data.items;

    enum EventType {
      NewUser = "NewUser",
      NewDonation = "NewDonation",
    }

    interface ParsedNewUserEvent {
      name: string;
      email: string;
      bio: string;
      avatar: string;
      cover: string;
      links: string[];
    }

    interface ParsedNewDonationEvent {
      to: string;
      from: string;
      amount: number;
    }

    const parsedEvents: {
      newUsers: ParsedNewUserEvent[];
      newDonations: ParsedNewDonationEvent[];
    } = {
      newUsers: [],
      newDonations: [],
    };

    events.forEach((event: any) => {
      const raw = event.raw_log_data;
      const topics = event.raw_log_topics;
      const eventType: EventType =
        topics.length === 3 ? EventType.NewDonation : EventType.NewUser;

      if (eventType === EventType.NewUser) {
        const newUserParse = iFace.decodeEventLog("NewUser", raw, topics);
        const newUserObj = {
          name: newUserParse[1][0],
          email: newUserParse[1][1],
          bio: newUserParse[1][2],
          avatar: newUserParse[1][3],
          cover: newUserParse[1][4],
          links: JSON.parse(newUserParse[1][5]),
        };
        parsedEvents.newUsers.push(newUserObj);
      } else if (eventType === EventType.NewDonation) {
        const newDonationParse = iFace.decodeEventLog(
          "NewDonation",
          raw,
          topics
        );
        const newDonationObj = {
          to: newDonationParse[0],
          from: newDonationParse[1],
          amount: newDonationParse[2],
        };
        parsedEvents.newDonations.push(newDonationObj);
      }
    });
    return parsedEvents;
  } catch (error) {
    console.error(error);
    return null;
  }
};
