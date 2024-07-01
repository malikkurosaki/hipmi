"use client";
import {
  ActionIcon,
  AppShell,
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  Indicator,
  Loader,
  Paper,
  ScrollArea,
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
  IconMessages,
  IconShoppingBag,
  IconMap2,
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
import { AccentColor, MainColor } from "../component_global/color/color_pallet";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";

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
  const [idLoadingProfil, setIsLoadingProfile] = useState(false);
  const [isLoadingUS, setIsLoadingUS] = useState(false);
  const [isLoadingBell, setIsLoadingBell] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [pageId, setPageId] = useState(0);

  const [countNotif, setCountNotif] = useState(countNotifikasi);

  const listHalamanFooter = [
    {
      id: 1,
      name: "Forums",
      icon: <IconMessages />,
      link: RouterForum.splash,
    },

    {
      id: 2,
      name: "MarketPlace",
      icon: <IconShoppingBag />,
      link: "",
    },
    {
      id: 3,
      name: "Business Maps",
      icon: <IconMap2 />,
      link: "",
    },
  ];

  useShallowEffect(() => {
    mqtt_client.subscribe("USER");

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(topic);
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
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
        pos={"static"}
      >
        {/* Header */}
        <Box
          style={{
            zIndex: 98,
          }}
          w={"100%"}
          bg={MainColor.darkblue}
          pos={"sticky"}
          top={0}
          h={"8vh"}
        >
          <Group position="apart" h={"100%"} px={"md"}>
            <ActionIcon
              radius={"xl"}
              variant={"transparent"}
              onClick={() => {
                if (dataUser?.Profile === null) {
                  ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                } else {
                  setIsLoadingUS(true);
                  router.push(RouterUserSearch.main);
                }
              }}
            >
              {isLoadingUS ? (
                <Loader size={20} />
              ) : (
                <IconUserSearch color="white" />
              )}
            </ActionIcon>

            <Center>
              <Title order={4} c={MainColor.yellow}>
                HIPMI
              </Title>
            </Center>
            <ActionIcon
              variant="transparent"
              onClick={() => {
                if (dataUser?.Profile === null) {
                  ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                } else {
                  router.push(RouterNotifikasi.main);
                  setIsLoadingBell(true);
                }
              }}
            >
              {isLoadingBell ? (
                <Loader size={20} />
              ) : (
                <Indicator
                  processing
                  color={MainColor.yellow}
                  label={<Text fz={10} c={MainColor.darkblue}>{countNotif}</Text>}
                >
                  <IconBell color="white" />
                </Indicator>
              )}
            </ActionIcon>
          </Group>
        </Box>

        {/* Children */}

        <Box h={"82vh"} pos={"static"}>
          <ScrollArea h={"100%"}>
            {/* {Array(10)
              .fill(0)
              .map((e, i) => (
                <Paper key={i} withBorder p={"lg"} h={100}>
                  {i + 1}
                </Paper>
              ))} */}
            {children}
          </ScrollArea>
          <Box
            style={{
              height: "10vh",
            }}
          />
        </Box>

        {/* <Box h={"100%"} pos={"static"}>
          <ScrollArea h={"100%"}>{children}</ScrollArea>
          <Box
            style={{
              height: "10vh",
            }}
          />
        </Box> */}

        {/* Footer */}
        <Box
          style={{
            zIndex: 99,
            borderRadius: "20px 20px 0px 0px",
          }}
          bg={MainColor.darkblue}
          w={"100%"}
          color="blue"
          pos={"fixed"}
          bottom={0}
          h={"10vh"}
        >
          <SimpleGrid
            bg={AccentColor.darkblue}
            cols={4}
            style={{
              borderRadius: "20px 20px 0px 0px",
              border: `1px solid ${AccentColor.blue}`,
            }}
          >
            {listHalamanFooter.map((e, i) => (
              <Center h={"10vh"} key={e.id}>
                {isLoadingPage && e.id === pageId ? (
                  <Center>
                    <Loader size={"sm"} />
                  </Center>
                ) : (
                  <Stack align="center" spacing={0}>
                    <ActionIcon
                      radius={"xl"}
                      // loading={isLoadingPage && e.id === pageId ? true : false}
                      c={e.link === "" ? "gray" : "white"}
                      variant="transparent"
                      onClick={() => {
                        if (dataUser?.Profile === null) {
                          ComponentGlobal_NotifikasiPeringatan(
                            "Lengkapi Profile"
                          );
                        } else {
                          e.link === ""
                            ? ComponentGlobal_NotifikasiPeringatan(
                                "Cooming Soon"
                              )
                            : (router.push(e.link),
                              setIsLoadingPage(true),
                              setPageId(e?.id));
                        }
                      }}
                    >
                      {e.icon}
                    </ActionIcon>
                    <Text c={e.link === "" ? "gray" : "white"} fz={"xs"}>
                      {e.name}
                    </Text>
                  </Stack>
                )}
              </Center>
            ))}

            <Center h={"10vh"}>
              {idLoadingProfil ? (
                <Center>
                  <Loader size={"sm"} />
                </Center>
              ) : (
                <Center>
                  <Stack
                    align="center"
                    spacing={2}
                    onClick={() => {
                      setIsLoadingProfile(true);
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
      </BackgroundImage>
    </>
  );
}
