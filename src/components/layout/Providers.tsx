"use client";
import React from "react";
import AuthProvider from "./AuthProvider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthProvider>{children}</AuthProvider>;
}
