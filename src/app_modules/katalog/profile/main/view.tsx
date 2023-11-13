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
import { getProfile } from "..";
import { MODEL_User_profile } from "@/app_modules/models/user_profile";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";

export default function ProfileView({ user }: { user: MODEL_User_profile }) {
  const router = useRouter();
  const [stateUser, setStateUser] = useState(user);
  useShallowEffect(() => {
    funGetUserProfile(user.id ?? "").then(setStateUser as any);
  }, []);

  if (!stateUser) return <></>;
  return (
    <>
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
              {stateUser.Profile?.ImageProfile?.url && (
                <Image
                  src={ApiHipmi.get_foto + stateUser.Profile?.ImageProfile?.url}
                  alt=""
                  radius={100}
                  width={100}
                  height={100}
                />
              )}
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
            onClick={() => router.push(`/dev/profile/upload/${stateUser.Profile?.id}`)}
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
            {stateUser.Profile?.name}
          </Text>
          <Text fz={"xs"}>@{stateUser.username}</Text>
        </Flex>
        <ActionIcon
          variant="transparent"
          onClick={() => {
            router.push(`/dev/profile/edit/${stateUser.id}`);
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
              <Text>+{stateUser.nomor}</Text>
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
              <Text> {stateUser.Profile?.email}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"}>
            <IconHome />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text> {stateUser.Profile?.alamat}</Text>
          </Grid.Col>
        </Grid>

        {(() => {
          if (stateUser.Profile?.jenisKelamin === "Laki - laki") {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderMale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {stateUser.Profile?.jenisKelamin}</Text>
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
                    <Text> {stateUser.Profile?.jenisKelamin}</Text>
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
