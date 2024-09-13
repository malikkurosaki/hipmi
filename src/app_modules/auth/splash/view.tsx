"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import {
  Avatar,
  BackgroundImage,
  Center,
  Image,
  Paper,
  Stack,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen({ userLoginId }: { userLoginId: any }) {
  const router = useRouter();

  useShallowEffect(() => {
    if (!userLoginId) {
      setTimeout(() => {
        return router.push("/dev/auth/login", { scroll: false });
      }, 1000);
    } else {
      setTimeout(() => {
        return router.push("/dev/home", { scroll: false });
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
