"use client";

import { Center, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashCrowd() {
  const router = useRouter();

  useShallowEffect(() => {
    setTimeout(() => router.push("/dev/crowd/main"), 2000);
  }, []);
  return (
    <>
      <Center h={"100vh"}>
       <Stack>
       <Text>Welcome to,</Text>
        <Title>CrowdFunding</Title>
       </Stack>
      </Center>
    </>
  );
}
