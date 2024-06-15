"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Center, Image, Paper } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_colab_hot_menu } from "../global_state";

export default function Colab_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      // setStatus("Publish");
      router.replace(RouterColab.beranda);
    }, 1000);
  }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="logo" src={"/aset/colab/logo.png"} />
        </Paper>
      </Center>
    </>
  );
}
