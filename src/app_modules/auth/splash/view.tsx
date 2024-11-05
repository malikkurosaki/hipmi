"use client";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { Avatar, BackgroundImage, Center, Image, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen({ userLoginId }: { userLoginId: any }) {
  const router = useRouter();

  useShallowEffect(() => {
    if (!userLoginId) {
      setTimeout(() => {
        return router.push(RouterAuth.login, { scroll: false });
      }, 1000);
    } else {
      setTimeout(() => {
        return router.push(RouterHome.main_home, { scroll: false });
      }, 1000);
    }
  }, []);

  return (
    <>
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
        // pos={"static"}
      >
        <Center h={"100vh"}>
          <Stack align="center" justify="center" p={"md"}>
            {/* <Title c={"#002e59"}>Welcome to</Title> */}
            <Avatar size={300} radius={"100%"}>
              <Image
                height={250}
                width={250}
                alt="Logo"
                src={"/aset/logo/logo-hipmi.png"}
              />
            </Avatar>
          </Stack>
        </Center>
      </BackgroundImage>
    </>
  );
}
