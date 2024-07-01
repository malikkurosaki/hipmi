"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import { Center, Image, Paper, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Forum_Splash() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => {
      router.replace(RouterForum.beranda);
    }, 1000);
  }, []);

  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate>
        <ViewSplash />
      </ComponentGlobal_UI_LayoutTamplate>
    </>
  );
}

function ViewSplash() {
  return (
    <>
      <Stack h={"90vh"} align="center" justify="center">
        <Paper
          radius={"100%"}
          // p={{ base: 50, md: 60, lg: 80 }}
        >
          <Image
            height={300}
            radius={"100%"}
            alt="logo"
            src={"/aset/forum/logo.png"}
          />
        </Paper>
      </Stack>
    </>
  );
}
