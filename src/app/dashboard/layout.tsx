"use client";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>layout</div>
      {children}
    </>
  );
}
