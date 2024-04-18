"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Grid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentColab_HeaderTamplate from "../component/header_tamplate";
import router from "next/router";
import {
  IconBell,
  IconHistory,
  IconHome,
  IconMessages,
  IconReservedLine,
  IconUsersGroup,
} from "@tabler/icons-react";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_colab_hot_menu } from "../global_state";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

export default function LayoutColab_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);
  const [loading, setLoading] = useState(false);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterColab.beranda,
      icon: <IconHome />,
    },

    // {
    //   id: 2,
    //   name: "Status",
    //   path: RouterColab.status,
    //   icon: <IconReservedLine />,
    // },

    {
      id: 3,
      name: "Partisipasi",
      path: RouterColab.proyek,
      icon: <IconUsersGroup />,
    },
    {
      id: 4,
      name: "Grup Diskusi",
      path: RouterColab.grup_diskusi,
      icon: <IconMessages />,
    },
    {
      id: 5,
      name: "Notifikasi",
      path: RouterColab.notifikasi,
      icon: <IconBell />,
    },
  ];

  return (
    <>
      <AppShell
        header={
          <ComponentColab_HeaderTamplate
            title="Project Collaboration"
            route={RouterHome.main_home}
            // icon={<IconUsersGroup />}
            // route2={RouterColab.proyek}
          />
        }
        footer={
          <Footer height={70} bg={"dark"}>
            <Grid>
              {listFooter.map((e) => (
                <Grid.Col
                  key={e.id}
                  span={"auto"}
                  pt={"md"}
                  onClick={() => {
                    router.replace(e.path);
                    setHotMenu(e.id);
                  }}
                >
                  <Center>
                    <Stack align="center" spacing={0}>
                      <ActionIcon
                        variant="transparent"
                        c={hotMenu === e.id ? "blue" : "white"}
                      >
                        {e.icon}
                      </ActionIcon>
                      <Text fz={10} c={hotMenu === e.id ? "blue" : "white"}>
                        {e.name}
                      </Text>
                    </Stack>
                  </Center>
                </Grid.Col>
              ))}
            </Grid>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
