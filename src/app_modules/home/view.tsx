"use client";

import { Text, Title } from "@mantine/core";
import { Logout } from "../auth";
import { useState } from "react";
import { ApiHipmi } from "@/app/lib/api";
import { useShallowEffect } from "@mantine/hooks";

export default function HomeView() {
  const [token, setToken] = useState<any | null>(null);

  useShallowEffect(() => {
    userToken();
  }, []);

  async function userToken() {
    await fetch(ApiHipmi.get_token)
      .then((res) => res.json())
      .then((val) => setToken(val));
  }

  return (
    <>
      {/* <pre>{JSON.stringify(token, null, 2)}</pre> */}
      <Title>Home</Title>
      <Text>Welcome, {token?.username}</Text>
      <Logout />
    </>
  );
}
