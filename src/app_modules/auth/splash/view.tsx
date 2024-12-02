"use client";

import { Avatar, BackgroundImage, Center, Image, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useShallowEffect(() => {
    setTimeout(() => {
      router.push("/dev/home", { scroll: false });
    }, 1000);
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
