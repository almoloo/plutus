"use server";
import axios from "axios";

const IPFS_URL = "https://rpc.particle.network/ipfs/upload";

export const uploadToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(IPFS_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    auth: {
      username: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!,
      password: process.env.NEXT_PUBLIC_PARTICLE_SERVER_KEY!,
    },
  });
  return response.data;
};
