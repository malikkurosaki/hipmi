"use client";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Center,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
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

  return (
    <>
      <AppShell
        header={
          <Header height={50} bg={"dark"}>
            <Group position="center" align="center" h={50} p={"sm"}>
              {/* <Group spacing={"sm"}>
                <ActionIcon>
                  <IconAward />
                </ActionIcon>
              </Group> */}
              <Text color="white" fw={"bold"}>
                HIPMI
              </Text>
              {/* <Group spacing={"sm"}>
                <ActionIcon>
                  <IconQrcode />
                </ActionIcon>
              </Group> */}
            </Group>
          </Header>
        }
        footer={
          <Footer height={70} bg={"dark"}>
            <Grid p={"xs"}>
              <Grid.Col
                span={"auto"}
                onClick={() => {
                  if (user.Profile === null) {
                    ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                  } else {
                    // router.push(RouterProfile.katalog + `${user.Profile.id}`);
                    router.push(RouterUserSearch.main)
                  }
                }}
              >
                <Stack align="center" spacing={0}>
                  <ActionIcon variant={"transparent"}>
                    <IconUserSearch color="white" />
                  </ActionIcon>
                  <Text fz={"xs"} c={"white"}>
                    Temukan pengguna
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col
                span={"auto"}
                onClick={() => {
                  if (user.Profile === null) {
                    router.push(RouterProfile.create + `${user.id}`);
                  } else {
                    router.push(RouterProfile.katalog + `${user.Profile.id}`);
                  }
                }}
              >
                <Stack align="center" spacing={2}>
                  <ActionIcon variant={"transparent"}>
                    {user.Profile === null ? <IconUserCircle color="white" /> : <Avatar radius={"xl"} size={30} src={RouterProfile.api_foto_profile + `${user.Profile.imagesId}`}/>} 
                  </ActionIcon>
                  <Text fz={"xs"} c={"white"}>
                    Profile
                  </Text>
                </Stack>
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
