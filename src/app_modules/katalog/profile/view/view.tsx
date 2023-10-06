"use client";

import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconAddressBook,
  IconCamera,
  IconEditCircle,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconMail,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { myConsole } from "@/app/fun/my_console";
import { useAtom } from "jotai";
import { ApiHipmi } from "@/app/lib/api";
import { loadDataProfile } from "../fun/fun_get_profile";
import { getFotoProfile } from "../api/get-foto-profile";
import { gs_fotoProfile, gs_profile } from "../state/global_state";

export default function ProfileView({ data }: { data: any }) {
  const router = useRouter();

  //Get data profile
  const [profile, setProfile] = useAtom(gs_profile);
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  const [foto, setFoto] = useAtom(gs_fotoProfile);
  useShallowEffect(() => {
    if (profile?.imagesId === undefined) {
      return myConsole("Waiting data");
    } else {
      getFotoProfile(profile?.imagesId).then((v) => setFoto(v?.url));
    }
  }, [profile?.imagesId]);

  return (
    <>
      {/* {JSON.stringify(data)} */}
      {/* Background dan foto */}
      <Box>
        <Paper bg={"gray"} p={"md"}>
          <Image alt="" src={"/aset/logo.png"} />
        </Paper>
        <Center>
          <Paper
            radius={100}
            h={105}
            w={105}
            sx={{
              borderStyle: "solid",
              borderRadius: "100%",
              borderWidth: 2,
              marginBottom: 10,
              paddingBottom: 10,
              position: "absolute",
              zIndex: 0,
            }}
          >
            <Center h={101}>
              <Image
                src={ApiHipmi.get_foto + foto ?? ""}
                alt=""
                radius={100}
                width={100}
                height={100}
                sx={
                  {
                    // position: "fixed",
                  }
                }
              />
            </Center>
          </Paper>
        </Center>

        <Center>
          <ActionIcon
            mr={-70}
            mt={15}
            variant="transparent"
            bg={"gray"}
            radius={50}
            onClick={() => router.push("/dev/katalog/profile/upload")}
            sx={{ position: "relative" }}
          >
            <IconCamera color="black" size={20} />
          </ActionIcon>
        </Center>
      </Box>

      {/* Username dan Nama */}
      <Group position="apart">
        <Flex direction={"column"} mt={"lg"}>
          <Text fz={"lg"} fw={"bold"}>
            {profile?.name}
          </Text>
          <Text fz={"xs"}>@{profile?.User?.username}</Text>
        </Flex>
        <ActionIcon
          variant="transparent"
          onClick={() => {
            router.push("/dev/katalog/profile/edit");
          }}
        >
          <IconEditCircle color={Warna.hijau_muda} size={20} />
        </ActionIcon>
      </Group>

      {/* Info user: nomor, email dll */}
      <Flex direction={"column"} pt={"lg"}>
        <Grid>
          <Grid.Col span={"content"}>
            <IconAddressBook />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text>
              {" "}
              <Text>+{profile?.User.nomor}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"}>
            <IconMail />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text>
              {" "}
              <Text> {profile?.email}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"}>
            <IconHome />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text> {profile?.alamat}</Text>
          </Grid.Col>
        </Grid>

        {(() => {
          if (profile?.jenisKelamin === "Laki - laki") {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderMale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {profile?.jenisKelamin}</Text>
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
                    <Text> {profile?.jenisKelamin}</Text>
                  </Grid.Col>
                </Grid>
              </>
            );
          }
        })()}
      </Flex>

      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
    </>
  );
}
