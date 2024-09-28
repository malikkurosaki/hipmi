"use client";

import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
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
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MODEL_PROFILE } from "../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function ProfileView({
  profile,
  userLoginId,
}: {
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loadingPP, setLoadingPP] = useState(false);
  const [loadingBG, setLoadingBG] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);


  return (
    <>
      {/* <pre>{JSON.stringify(profile, null,2)}</pre> */}
      <Paper px={"md"} py={"sm"} shadow="lg" style={{
        backgroundColor: MainColor.darkblue,
        border: `2px solid ${AccentColor.blue}`,
      }}>
        {/* Background dan foto */}

        {/* Upload Background Profile */}
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"sm"} shadow="md">
              <Image
                mah={"100%"}
                maw={"100%"}
                alt="Background"
                src={
                  profile?.ImagesBackground.url
                    ? RouterProfile.api_url_background +
                      `${profile?.ImagesBackground.url}`
                    : "/aset/no-image.png"
                }
              />
            </Paper>
          </AspectRatio>

          {/* Upload Background Profile */}
          {profile?.User.id === userLoginId ? (
            <Center>
              <ActionIcon
                loading={loadingBG ? true : false}
                ml={{ base: 300, sm: 500, md: 900, lg: 1000 }}
                mt={-10}
                bg={"gray.5"}
                variant="transparent"
                radius={50}
                onClick={() => {
                  setLoadingBG(true);
                  router.push(
                    RouterProfile.update_foto_background + `${profile.id}`
                  );
                }}
                sx={{
                  position: "relative",
                  color: "gray",
                  border: "1px",
                  borderStyle: "solid",
                }}
              >
                <IconCamera color="black" size={20} />
              </ActionIcon>
            </Center>
          ) : (
            ""
          )}

          {/* Foto Profile */}
          <Center>
            <Box
              sx={{
                marginBottom: 10,
                paddingBottom: 10,
                position: "absolute",
                zIndex: 0,
              }}
            >
              <Avatar
                bg={"gray.2"}
                sx={{
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderWidth: "0.5px",
                }}
                src={
                  profile?.ImageProfile?.url
                    ? RouterProfile.api_url_foto +
                      `${profile?.ImageProfile.url}`
                    : "/aset/global/avatar.png"
                }
                size={100}
                radius={"100%"}
              />
            </Box>
          </Center>

          {/* Upload Foto Profile */}
          {profile?.User.id === userLoginId ? (
            <Center>
              <ActionIcon
                loading={loadingPP ? true : false}
                mr={-70}
                mt={15}
                variant="transparent"
                bg={"gray.5"}
                radius={50}
                onClick={() => {
                  setLoadingPP(true);
                  router.push(
                    RouterProfile.update_foto_profile + `${profile.id}`
                  );
                }}
                sx={{
                  position: "relative",
                  border: "1px",
                  borderStyle: "solid",
                }}
              >
                <IconCamera color="black" size={20} />
              </ActionIcon>
            </Center>
          ) : (
            ""
          )}
        </Box>

        {/* Username dan Nama */}

        <Grid>
          <Grid.Col
            span={"auto"}
            pt={profile?.User.id === userLoginId ? 10 : 50}
          >
            <Stack spacing={0}>
              <Text fz={"lg"} fw={"bold"} lineClamp={1}>
                {profile?.name}
              </Text>
              <Text fz={"xs"} c={"dark.3"}>
                @{profile?.User?.username}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            {profile?.User.id === userLoginId ? (
              <ActionIcon
                loading={loadingEdit ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoadingEdit(true);
                  router.push(RouterProfile.edit + `${profile.id}`);
                }}
              >
                <IconEditCircle color={Warna.hijau_muda} />
              </ActionIcon>
            ) : (
              ""
            )}
          </Grid.Col>
        </Grid>

        {/* <Group
          position="apart"
          pt={profile?.User.id === userLoginId ? 0 : "xl"}
        >
          <Flex direction={"column"} mt={"lg"}></Flex>
        </Group> */}

        {/* Info user: nomor, email dll */}
        <Stack spacing={"xs"} pt={"lg"}>
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
        </Stack>
      </Paper>

      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
    </>
  );
}
