/*
	this file is used to define the types that are used in the application
*/

import type { UserInfo } from "@particle-network/auth";
import type { BrowserProvider, JsonRpcSigner } from "ethers";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  ethers: BrowserProvider | null;
  ethersSigner: Promise<JsonRpcSigner> | null;
  login: () => Promise<UserInfo | null>;
  logout: () => Promise<void>;
};

export interface User {
  uuid: string;
  email?: string;
  name?: string;
  created_at?: Date;
  address: string;
}
