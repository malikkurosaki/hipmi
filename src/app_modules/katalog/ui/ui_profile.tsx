"use client";

import {
  MainColor,
  AccentColor,
} from "@/app_modules/component_global/color/color_pallet";
import {
  Avatar,
  Box,
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { MODEL_PROFILE } from "../profile/model/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  IconBrandGmail,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconPhone,
} from "@tabler/icons-react";

export function Profile_UiView({
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

  const listInformation = [
    {
      icon: <IconPhone />,
      value: profile?.User.nomor,
    },
    {
      icon: <IconBrandGmail />,
      value: profile?.email,
    },
    {
      icon: <IconHome />,
      value: profile?.alamat,
    },
    {
      icon:
        profile.jenisKelamin === "Laki-laki" ? (
          <IconGenderMale />
        ) : (
          <IconGenderFemale />
        ),
      value: profile?.jenisKelamin,
    },
  ];

  return (
    <>
      <Stack
        spacing={0}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Box>
          <Image
            radius={"sm"}
            height={200}
            alt="Background"
            src={
              profile?.ImagesBackground.url
                ? RouterProfile.api_url_background +
                  `${profile?.ImagesBackground.url}`
                : "/aset/no-image.png"
            }
          />
          <Box
            sx={{
              position: "relative",
              bottom: 60,
              margin: "auto",
              width: "100%",
              marginBottom: -30,
            }}
          >
            <Center>
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
            </Center>
            <Stack align="center" c={"white"} mt={"xs"} spacing={0}>
              <Text fw={"bold"} lineClamp={1}>
                {profile?.name}
              </Text>
              <Text fs={"italic"} fz={"sm"} lineClamp={1}>
                @{profile?.User?.username}
              </Text>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Stack spacing={"xs"}>
            {listInformation.map((e, i) => (
              <Group key={i}  align="flex-start">
                <ThemeIcon
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  {e.icon}
                </ThemeIcon>
                <Box w={"85%"} >
                  <Text fw={"bold"}>{e?.value}</Text>
                </Box>
              </Group>
            ))}
          </Stack>
        </Box>
        {/* <pre
          style={{
            color: "white",
          }}
        >
          {JSON.stringify(profile, null, 2)}
        </pre> */}
      </Stack>
    </>
  );
}
