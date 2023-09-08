"use client";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  FileInput,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { valueCookies } from "../../auth/state/s_token";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { getDataProfile } from "./fun/get-profile";
import { IconFile, IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ViewProfile({ data }: { data: any }) {
  const router = useRouter();
  const [token, setToken] = useAtom(valueCookies);
  const [dataProfile, setProfile] = useState(data);

  return (
    <>
      <Center>Profile</Center>

      {/* <pre>{JSON.stringify(dataProfile, null, 2)}</pre> */}

      <Flex direction={"column"}>
        <Text>Nama : {dataProfile?.name}</Text>
        <Text>Username : {dataProfile?.User?.username}</Text>
      </Flex>
      <Box>
        <Button compact onClick={() => router.push("/dev/katalog/profile/upload")}>
          Upload Foto
        </Button>
      </Box>
    </>
  );
}
