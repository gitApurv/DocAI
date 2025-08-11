"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserContext } from "@/context/UserContext";
import User from "@/types/user";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (user) {
      createUser();
    }
  }, []);

  const createUser = async () => {
    try {
      const result = await axios.post("/api/users");
      setUserDetails(result.data);
    } catch (error) {
      console.error("User creation failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <div>{children}</div>
    </UserContext.Provider>
  );
}
