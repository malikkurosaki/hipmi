"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentGlobal_SplashScreen from "@/app_modules/component_global/splash/splash_global";
import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
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
      router.replace(RouterForum.beranda, { scroll: false });
    }, 1000);
  }, []);

  return (
    <>
      <ComponentGlobal_SplashScreen icon={<IconMessages size={300} />} />
    </>
  );
}
