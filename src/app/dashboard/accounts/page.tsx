"use client";
import EditableLink from "@/components/accounts/EditableLink";
import { AuthContext } from "@/components/layout/AuthProvider";
import { UserInfo } from "@particle-network/auth";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const auth = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (auth?.isAuthenticated) {
        setUserInfo(await auth.getUserInfo());
      }
    };
    fetchUserInfo();
  }, [auth]);
  return (
    <>
      <h1>Accounts</h1>
      {/* GITHUB ACCOUNT */}
      <EditableLink name="github" getter="githubGet" setter="githubSet" />
    </>
  );
}
