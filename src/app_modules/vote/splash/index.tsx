"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Center, Image, Paper, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_vote_hotMenu } from "../global_state";

export default function Vote_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(0)
      router.replace(RouterVote.beranda);
    }, 2000);
  }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Paper>
          <Image alt="logo" src={"/aset/vote/logo.png"} />
        </Paper>
      </Center>
    </>
  );
}
