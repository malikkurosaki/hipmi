"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AspectRatio, Center, Image, Paper, Stack, Title } from "@mantine/core";
import { useShallowEffect, useTimeout } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_event_hotMenu, gs_event_status } from "../global_state";

export default function Event_SplashScreen() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);

  useShallowEffect(() => {
    setTimeout(() => {
      router.replace(RouterEvent.beranda);
      setHotMenu(0);
      setTabsStatus("Publish");
    }, 2000);
  }, []);
  return (
    <>
      <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="event" src={"/aset/event/splash-event.png"} />
        </Paper>
      </Center>
    </>
  );
}
