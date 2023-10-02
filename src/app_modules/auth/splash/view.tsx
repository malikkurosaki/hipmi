"use client";

import { Flex, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SplashScreen() {
  const router = useRouter();
  const [val, setVal] = useState(false);

  useShallowEffect(() => {
    if (!val) {
      setTimeout(() => {
        return router.push("/dev/auth/login");
      }, 2000);
    } else {
      setTimeout(() => {
        return router.push("/dev/home");
      }, 2000);
    }
  }, []);
  return (
    <>
      <Flex justify={"center"} align={"center"} h={"100vh"}>
        <Title order={1}>Splash Screen</Title>
      </Flex>
    </>
  );
}
