"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import {
  Avatar,
  Center,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconMessages } from "@tabler/icons-react";
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
      <Stack h={"90vh"} align="center" justify="center" spacing={"xl"}>
        <IconMessages size={350} color="white" />
        <Loader variant="dots" color="white" />
      </Stack>
    </>
  );
}
