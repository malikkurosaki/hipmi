"use client";

import { useAtom } from "jotai";
import { Logout } from "../auth";
import { valueCookies } from "../auth/state/s_token";
import { useState } from "react";
import { Button, Center, Flex, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import toast from "react-simple-toasts";
import { s_getOneUser } from "./state/s_get_one";
import { getAllUser } from "./fun/get-one";

export default function ViewHome() {
  const router = useRouter();
  const [valToken, setToken] = useAtom(valueCookies);

  useShallowEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await fetch("/api/user/get-one")
      .then((res) => res.json())
      .then((val) => setToken(val));
  }

  return (
    <>
      {/* {JSON.stringify(valToken, null, 2)} */}

      <Center>
        <Flex direction={"column"} gap={"lg"}>
          <Title>Home</Title>
          <Text>Welcome, {valToken?.data?.username}</Text>
          <Button
            onClick={() => {
              if (valToken?.data?.Profile === null) {
                return router.push("/dev/katalog/profile/create");
              } else {
                return router.push("/dev/katalog/view");
              }
            }}
          >
            Katalog
          </Button>

          <Logout />
        </Flex>
      </Center>
    </>
  );
}
