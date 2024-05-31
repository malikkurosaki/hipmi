"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { Center, Image, Paper } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Forum_Splash() {
const router = useRouter()
    useShallowEffect(() => {
      setTimeout(() => {
        // setHotMenu(1);
        // setStatus("Publish");
        router.replace(RouterForum.beranda);
      }, 1000);
    }, []);

  return (
    <>
      <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="logo" src={"/aset/forum/logo.png"} />
        </Paper>
      </Center>
    </>
  );
}
