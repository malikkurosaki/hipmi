"use client";

import { Center, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function KonfirmasiBuktiInvestasi() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => router.push("/dev/investasi/main/portofolio"), 2000);
  }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Stack>
          <Text>Bukti Transfer Berhasil Di Upload</Text>
          <Center>
            <IconCircleCheck size={100} />
          </Center>
        </Stack>
      </Center>
    </>
  );
}
