"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { AspectRatio, Center, Image, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_adminDonasi_hotMenu } from "../donasi/global_state";

export default function SplashDashboardAdmin() {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_adminDonasi_hotMenu);

  useShallowEffect(() => {
    setTimeout(() => {
      router.push(RouterAdminDashboard.main_admin);
      setActive(0);
    }, 2000);
  }, []);
  return (
    <>
    <Center h={"100vh"}>
    <Stack spacing={0} >
        <Title>Welcome Admin</Title>

        <AspectRatio ratio={1 / 1}  mah={700} maw={700}>
          <Image src={"/aset/logo/logo-hipmi.png"} alt="Logo" />
        </AspectRatio>
      </Stack>
    </Center>
    </>
  );
}
