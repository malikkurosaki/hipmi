"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { Center, Image, Paper, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_job_hot_menu } from "../global_state";

export default function Job_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      router.replace(RouterJob.beranda);
    }, 2000);
  }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Paper>
          <Image alt="logo" src={"/aset/job/logo.png"} />
        </Paper>
      </Center>
    </>
  );
}
