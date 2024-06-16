"use client";

import { Warna } from "@/app/lib/warna";
import { Center, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashCrowd() {
  const router = useRouter();

  useShallowEffect(() => {
    setTimeout(() => router.push("/dev/crowd/main"), 1000);
  }, []);
  return (
    <>
      <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="" src={"/aset/investasi/logo-crowd.png"} />
        </Paper>
      </Center>
    </>
  );
}
