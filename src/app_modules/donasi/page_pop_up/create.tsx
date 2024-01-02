"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Box, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function PagePopUpCreateDonasi() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => router.push(RouterDonasi.main_galang_dana), 2000);
  }, []);
  return (
    <>
      <Stack h={"80vh"} align="center" justify="center">
        <IconCircleCheck size={100} color="green" />
        <Title order={3}>Berhasil Membuat Pengalangan Dana</Title>
      </Stack>
    </>
  );
}
