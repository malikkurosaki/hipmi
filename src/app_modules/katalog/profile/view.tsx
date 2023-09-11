"use client";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  FileInput,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { valueCookies } from "../../auth/state/s_token";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { getDataProfile } from "./fun/get-profile";
import {
  IconCamera,
  IconEditCircle,
  IconFile,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconMail,
  IconUpload,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Warna } from "@/app/lib/warna";

export default function ViewProfile({ data }: { data: any }) {
  const router = useRouter();
  const [token, setToken] = useAtom(valueCookies);
  const [dataProfile, setProfile] = useState(data);
  const [foto, setFoto] = useState<File | null>(null);

  return (
    <>
      {/* {JSON.stringify(foto)} */}
      <Center>
        <Image
          height={100}
          width={100}
          alt="foto"
          src={foto == null ? "/aset/avatar.png" : ""}
        />
      </Center>

      <Center bg={"blue"}>
        <ActionIcon
          mr={-70}
          mt={-30}
          variant="transparent"
          bg={"gray"}
          radius={50}
          onClick={() => router.push("/dev/katalog/profile/upload")}
          // sx={{ zIndex: 2 }}
        >
          <IconCamera color="black" size={20} />
        </ActionIcon>
      </Center>

      {/* Username dan name */}
      <Group position="apart">
        <Flex direction={"column"} mt={"lg"}>
          <Text fz={"lg"} fw={"bold"}>
            {dataProfile?.name}
          </Text>
          <Text fz={"xs"}>@{dataProfile?.User?.username}</Text>
        </Flex>
        <ActionIcon variant="transparent" onClick={() => router.push("/dev/katalog/profile/edit")}>
          <IconEditCircle color={Warna.hijau_muda} size={20} />
        </ActionIcon>
      </Group>

      {/* Data Profile */}
      <Group spacing={5} pt={"lg"}>
        <Grid>
          <Grid.Col span={"content"}>
            <IconMail />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text>
              {" "}
              <Text> {dataProfile?.email}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"} >
            <IconHome />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text> {dataProfile?.alamat}</Text>
          </Grid.Col>
        </Grid>

        {(() => {
          if (dataProfile?.jenisKelamin === "Laki - laki") {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderMale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {dataProfile?.jenisKelamin}</Text>
                  </Grid.Col>
                </Grid>
              </>
            );
          } else {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderFemale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {dataProfile?.jenisKelamin}</Text>
                  </Grid.Col>
                </Grid>
              </>
            );
          }
        })()}
      </Group>
    </>
  );
}
