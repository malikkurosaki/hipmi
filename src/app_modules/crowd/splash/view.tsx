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
        <Stack align="center" justify="center">
          <Text>Welcome to,</Text>
          <Title>HIPMI</Title>
          <Title order={3}>CrowdFunding</Title>
        </Stack>
      </Center>
    </>
  );
}
