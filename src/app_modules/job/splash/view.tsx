"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { Center, Image, Paper, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_job_hot_menu, gs_job_status } from "../global_state";

export default function Job_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [status, setStatus] = useAtom(gs_job_status);
  

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      setStatus("Publish")
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
