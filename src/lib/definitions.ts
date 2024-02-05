/*
	this file is used to define the types that are used in the application
*/

import type { UserInfo } from "@particle-network/auth";
import type { BrowserProvider, JsonRpcSigner } from "ethers";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: UserInfo | null;
  ethers: BrowserProvider | null;
  ethersSigner: Promise<JsonRpcSigner> | null;
  login: () => Promise<UserInfo | null>;
  logout: () => Promise<void>;
};
