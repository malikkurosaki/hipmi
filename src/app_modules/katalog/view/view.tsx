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
import { getProfile } from "../profile";
import { gs_profile } from "../profile/state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { useAtom } from "jotai";
import { loadDataProfile } from "../profile/fun/fun_get_profile";
import { getFotoProfile } from "../profile/fun/api-get-foto-profile";
import { ApiHipmi } from "@/app/lib/api";
import { loadFotoProfile } from "../profile/fun/fun_get_foto_profile";

export default function KatalogView({data}: {data: any}) {
  const router = useRouter();

  //Get data profile
  const [profile, setProfile] = useState(data)
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  const [foto, setFoto] = useState("")
  useShallowEffect(() => {
    console.log(profile.imagesId, "use efek")
    loadFotoProfile(profile.imagesId, setFoto)
  },[])
  

  // useShallowEffect(() => {
  //   if (profile?.imagesId === undefined || profile?.imagesId === null) {
  //     myConsole("Waiting data");
  //   } else {
  //     getFotoProfile(profile?.imagesId).then((res) => setFoto(res?.url));
  //   }
  //   myConsole(profile?.imagesId);
  // }, [profile?.imagesId]);

  return (
    <>
    {JSON.stringify(profile.imagesId)}<br/> 
    {JSON.stringify(foto)}
      {/* Background dan foto */}
      <Box>
        <Paper bg={"gray"} p={"md"}>
          <Image alt="" src={"/aset/logo.png"} />
        </Paper>
        <Center>
          {foto ? (
            <Image
              radius={50}
              alt=""
              src={ApiHipmi.get_foto + `${foto}`}
              height={100}
              width={100}
              sx={{
                position: "absolute",
                marginBottom: 10,
                paddingBottom: 10,
              }}
            />
          ) : (
            <Image
              radius={50}
              alt=""
              src={"/aset/avatar.png"}
              height={100}
              width={100}
              sx={{
                position: "absolute",
                marginBottom: 10,
                paddingBottom: 10,
              }}
            />
          )}
        </Center>
        <Center>
          <ActionIcon
            mr={-70}
            mt={10}
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
