"use client";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Center,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  Indicator,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { HomeView } from ".";
import {
  IconUserSearch,
  IconAward,
  IconQrcode,
  IconUserCircle,
  IconBell,
} from "@tabler/icons-react";
import { Logout } from "../auth";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MODEL_USER } from "./model/interface";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "../component_global/notif_global/notifikasi_berhasil";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { useShallowEffect } from "@mantine/hooks";
import notifikasi_countUserNotifikasi from "../notifikasi/fun/count/fun_count_by_id";
import mqtt_client from "@/util/mqtt_client";

export default function HomeLayout({
  dataUser,
  children,
  countNotifikasi,
}: {
  dataUser: MODEL_USER;
  children: React.ReactNode;
  countNotifikasi: number;
}) {
  const router = useRouter();
  // const [user, setUser] = useState(dataUser);
  const [loadingProfil, setLoadingProfile] = useState(false);
  const [loadingUS, setLoadingUS] = useState(false);
  const [countNotif, setCountNotif] = useState(countNotifikasi);

  useShallowEffect(() => {
    mqtt_client.subscribe("USER");
    // mqtt_client.subscribe("Notifikasi_forum_create_komentar");

    mqtt_client.on("message", (topic: any, message: any) => {
      console.log(topic);
      const data = JSON.parse(message.toString());

      if (data.userId === dataUser.id) {
        setCountNotif(countNotif + data.count);
      }
    });

    onLoadNotifikasi({
      onLoad(val) {
        setCountNotif(val);
      },
    });
  }, [countNotif]);

  async function onLoadNotifikasi({ onLoad }: { onLoad: (val: any) => void }) {
    const loadNotif = await notifikasi_countUserNotifikasi();
    onLoad(loadNotif);
  }

  return (
    <>
      <Box>
        {/* Header */}
        <Box
          style={{
            zIndex: 99,
          }}
          w={"100%"}
          bg={"black"}
          pos={"sticky"}
          top={0}
          h={50}
        >
          <Group position="apart" h={"100%"} px={"md"}>
            <ActionIcon variant="transparent" disabled></ActionIcon>
            <Center>
              <Title order={4} c={"white"}>
                HIPMI
              </Title>
            </Center>
            <ActionIcon
              variant="transparent"
              onClick={() => {
                router.push(RouterNotifikasi.main);
              }}
            >
              <Indicator processing label={<Text fz={10}>{countNotif}</Text>}>
                <IconBell />
              </Indicator>
            </ActionIcon>
          </Group>
        </Box>

        {/* Children */}
        <Box p={"sm"} pos={"static"}>
          <Stack>
            {children}
            <Box
              style={{
                height: "10vh",
              }}
            ></Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box
          style={{
            zIndex: 99,
          }}
          w={"100%"}
          bg={"black"}
          pos={"fixed"}
          bottom={0}
          h={"10vh"}
        >
          <SimpleGrid cols={2}>
            <Center h={"10vh"}>
              {loadingUS ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <Center>
                  <Stack
                    align="center"
                    spacing={0}
                    onClick={() => {
                      if (dataUser?.Profile === null) {
                        ComponentGlobal_NotifikasiPeringatan(
                          "Lengkapi Profile"
                        );
                      } else {
                        setLoadingUS(true);
                        // router.push(RouterProfile.katalog + `${user.Profile.id}`);
                        router.push(RouterUserSearch.main);
                      }
                    }}
                  >
                    <ActionIcon variant={"transparent"}>
                      <IconUserSearch color="white" />
                    </ActionIcon>
                    <Text fz={"xs"} c={"white"}>
                      Temukan pengguna
                    </Text>
                  </Stack>
                </Center>
              )}
            </Center>

            <Center h={"10vh"}>
              {loadingProfil ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <Center>
                  <Stack
                    align="center"
                    spacing={2}
                    onClick={() => {
                      setLoadingProfile(true);
                      if (dataUser?.Profile === null) {
                        router.push(RouterProfile.create);
                      } else {
                        router.push(
                          RouterProfile.katalog + `${dataUser.Profile.id}`
                        );
                      }
                    }}
                  >
                    <ActionIcon variant={"transparent"}>
                      {dataUser?.Profile === null ? (
                        <IconUserCircle color="white" />
                      ) : (
                        <Avatar
                          radius={"xl"}
                          size={25}
                          sx={{
                            borderStyle: "solid",
                            borderWidth: "0.5px",
                            borderColor: "white",
                          }}
                          src={
                            RouterProfile.api_foto_profile +
                            `${dataUser?.Profile.imagesId}`
                          }
                        />
                      )}
                    </ActionIcon>
                    <Text fz={"xs"} c={"white"}>
                      Profile
                    </Text>
                  </Stack>
                </Center>
              )}
            </Center>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
