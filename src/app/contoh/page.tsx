"use client";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Image,
  Loader,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export default function Page() {
  return (
    <>
      <Box p={"lg"} bg={"gray"} h={"100vh"}>
        <Center h={"100%"}>
          <ActionIcon bg={"blue"}>
            <Avatar
              size={100}
              radius={"100%"}
              src={
                // "https://wibu-storage.wibudev.com/api/files/cm1efheqx005vkp7jo7lqarnf"
                "/aset/global/avatar.png"
              }
            />
          </ActionIcon>
        </Center>
      </Box>
    </>
  );
  return (
    <>
      <LoadImage
        url={
          "https://wibu-storage.wibudev.com/api/files/cm192febp004jkp7j2x1fgekw"
        }
      />
    </>
  );
}

function LoadImage({ url }: { url: string }) {
  const [ada, setAda] = useState<boolean | null>(null);

  useShallowEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return setAda(true);
      }
      setAda(false);
    } catch (error) {
      console.log("");
    }
  }

  if (ada === null)
    return (
      <Box w={100}>
        <Image w={"100%"} src={"/aset/global/loading.gif"} alt="" />
      </Box>
    );
  if (!ada)
    return (
      <Image
        src={
          "https://cdn.idntimes.com/content-images/community/2021/06/2318629899-0991efc170-o-cropped-56965fbaa68adf470a17cc45ea5d328d-321a5127ded916230393dbb7bf7d130e_600x400.jpg"
        }
        alt=""
      />
    );
  return <Image src={url} alt="" />;
}
