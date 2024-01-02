"use client";

import { Warna } from "@/app/lib/warna";
import { Center, Image, Stack, Text, Title } from "@mantine/core";
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
          <Title c={"#002e59"}>Welcome to</Title>
          <Image alt="" src={"/aset/investasi/logo-crowd.png"} />
        </Stack>
      </Center>
    </>
  );
}
