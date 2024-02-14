"use client";
import { useContext } from "react";
import { AuthContext } from "@/components/layout/AuthProvider";

export default function page() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div>page</div>
    </>
  );
}
