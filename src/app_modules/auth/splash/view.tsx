"use client";

import { MainColor } from "@/app_modules/component_global/color/color_pallet";
import {
  Center,
  Image,
  Paper,
  Stack
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen({ data }: { data: any }) {
  const router = useRouter();

  useShallowEffect(() => {
    if (!data) {
      setTimeout(() => {
        return router.push("/dev/auth/login");
      }, 2000);
    } else {
      setTimeout(() => {
        return router.push("/dev/home");
      }, 2000);
    }
  }, []);
  return (
    <>
      <Center h={"100vh"} bg={MainColor.darkblue}>
        <Stack align="center" justify="center" p={"md"}>
          {/* <Title c={"#002e59"}>Welcome to</Title> */}
          <Paper
            p={{ base: 20, md: 30, lg: 40 }}
            bg={"gray.1"}
            radius={"100%"}
            shadow="xl"
          >
            <Image height={200} alt="" src={"/aset/logo/logo-hipmi.png"} />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
