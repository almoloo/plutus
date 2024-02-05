"use client";
import React from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
