"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashDashboardAdmin() {
    const router = useRouter()
    useShallowEffect(() => {
        setTimeout(() => router.push(RouterAdminDashboard.main_admin), 2000)
    },[])
  return (
    <>
      <Stack align="center" justify="center" h={"100vh"}>
        <Title order={4} c={"orange"}>Selamat Datang, ADMIN</Title>
        <Title c={"red"}>HIPMI</Title>

      </Stack>
    </>
  );
}
