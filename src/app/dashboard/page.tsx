"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";
import { getAllTransactions } from "@/lib/data";

export default function page() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await getAllTransactions(auth?.user?.address!);
      console.log("ttt transactions: ", transactions);
    };
    if (auth?.user?.address) {
      console.log("ttt auth?.user?.address: ", auth?.user?.address);
      getTransactions();
    }
  }, [auth?.user?.address]);
  return (
    <>
      <div>page</div>
    </>
  );
}
