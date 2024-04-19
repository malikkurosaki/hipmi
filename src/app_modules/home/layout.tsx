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
} from "@tabler/icons-react";
import { Logout } from "../auth";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MODEL_USER } from "./model/interface";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "../component_global/notif_global/notifikasi_berhasil";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";

export default function HomeLayout({
  dataUser,
  children,
}: {
  dataUser: MODEL_USER;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState(dataUser);
  const [loadingProfil, setLoadingProfile] = useState(false);
  const [loadingUS, setLoadingUS] = useState(false);
  const listFooter = [
    {
      id: 1,
      name: "Temukan user",
      icon: <IconUserSearch />,
      link: ``,
    },
    {
      id: 2,
      name: "Profile",
      icon: <IconUserCircle />,
      link: RouterProfile.katalog,
    },
  ];

  const Compo_Footer = (
    <Footer height={70} w={"100%"} bg={"black"}>
      <Grid p={"xs"}>
        <Grid.Col span={"auto"}>
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
                  if (user?.Profile === null) {
                    ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
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
        </Grid.Col>
        <Grid.Col span={"auto"}>
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
                  if (user?.Profile === null) {
                    router.push(RouterProfile.create + `${user.id}`);
                  } else {
                    router.push(RouterProfile.katalog + `${user.Profile.id}`);
                  }
                }}
              >
                <ActionIcon variant={"transparent"}>
                  {user?.Profile === null ? (
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
                        `${user?.Profile.imagesId}`
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
        </Grid.Col>
      </Grid>
    </Footer>
  );

  return (
    <>
      <Box>
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
          <Center h={"100%"}>
            <Title order={4} c={"white"}>
              HIPMI
            </Title>
          </Center>
        </Box>
        <Box p={"sm"} pos={"static"}>
          {children}
        </Box>

        <Box
          style={{
            zIndex: 98,
          }}
          w={"100%"}
          bg={"black"}
          pos={"sticky"}
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
                      if (user?.Profile === null) {
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
                      if (user?.Profile === null) {
                        router.push(RouterProfile.create + `${user.id}`);
                      } else {
                        router.push(
                          RouterProfile.katalog + `${user.Profile.id}`
                        );
                      }
                    }}
                  >
                    <ActionIcon variant={"transparent"}>
                      {user?.Profile === null ? (
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
                            `${user?.Profile.imagesId}`
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

  return (
    <>
      <AppShell
        header={
          <Header height={50} bg={"dark"}>
            <Group position="center" align="center" h={50} p={"sm"}>
              <Text color="white" fw={"bold"}>
                HIPMI
              </Text>
              {/* <Logout/> */}
            </Group>
          </Header>
        }
        footer={
          <Footer height={70} bg={"dark"}>
            <Grid p={"xs"} bg={"blue"}>
              <Grid.Col
                bg={"red"}
                span={"auto"}
                onClick={() => {
                  if (user?.Profile === null) {
                    ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                  } else {
                    setLoadingUS(true);
                    // router.push(RouterProfile.katalog + `${user.Profile.id}`);
                    router.push(RouterUserSearch.main);
                  }
                }}
              >
                {loadingUS ? (
                  <Center>
                    <Loader />
                  </Center>
                ) : (
                  <Stack align="center" spacing={0}>
                    <ActionIcon variant={"transparent"}>
                      <IconUserSearch color="white" />
                    </ActionIcon>
                    <Text fz={"xs"} c={"white"}>
                      Temukan pengguna
                    </Text>
                  </Stack>
                )}
              </Grid.Col>
              <Grid.Col
                bg={"cyan"}
                span={"auto"}
                onClick={() => {
                  setLoadingProfile(true);
                  if (user?.Profile === null) {
                    router.push(RouterProfile.create + `${user.id}`);
                  } else {
                    router.push(RouterProfile.katalog + `${user.Profile.id}`);
                  }
                }}
              >
                {loadingProfil ? (
                  <Center>
                    <Loader />
                  </Center>
                ) : (
                  <Stack align="center" spacing={2}>
                    <ActionIcon variant={"transparent"}>
                      {user?.Profile === null ? (
                        <IconUserCircle color="white" />
                      ) : (
                        <Avatar
                          radius={"xl"}
                          size={30}
                          sx={{
                            borderStyle: "solid",
                            borderWidth: "0.5px",
                            borderColor: "white",
                          }}
                          src={
                            RouterProfile.api_foto_profile +
                            `${user?.Profile.imagesId}`
                          }
                        />
                      )}
                    </ActionIcon>
                    <Text fz={"xs"} c={"white"}>
                      Profile
                    </Text>
                  </Stack>
                )}
              </Grid.Col>
            </Grid>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
