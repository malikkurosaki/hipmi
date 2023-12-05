"use client";

import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SplashScreen({ data }: { data: any }) {
  const router = useRouter();
  const [val, setVal] = useState(false);

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
      <Center h={"100vh"}>
        <Stack align="center" justify="center" p={"md"}>
          {/* <Title c={"#002e59"}>Welcome to</Title> */}
          <Paper
            p={{ base: 50, md: 60, lg: 80 }}
            bg={"gray.1"}
            radius={500}
            shadow="xl"
          >
            <Image alt="" src={"/aset/logo/logo-hipmi.png"} />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
