"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Center, Image, Paper, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  gs_vote_hotMenu,
  gs_vote_riwayat,
  gs_vote_status,
} from "../global_state";

export default function Vote_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const [tabsRiwayat, setTabsRiwayat] = useAtom(gs_vote_riwayat);
  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(0);
      setTabsStatus("Publish");
      setTabsRiwayat("Semua");
      router.replace(RouterVote.beranda);
    }, 1000);
  }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="logo" src={"/aset/vote/logo.png"} />
        </Paper>
      </Center>
    </>
  );
}
