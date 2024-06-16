"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import {
  ActionIcon,
  Center,
  Footer,
  Grid,
  Indicator,
  Stack,
  Text
} from "@mantine/core";
import {
  IconBell,
  IconHome,
  IconMessages,
  IconUsersGroup
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ComponentColab_HeaderTamplate from "../component/header_tamplate";
import { gs_colab_hot_menu } from "../global_state";

export default function LayoutColab_Main({
  children,
  cekNotif,
}: {
  children: React.ReactNode;
  cekNotif: boolean;
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
      icon: cekNotif ? (
        <Indicator processing color="orange">
          <IconBell />
        </Indicator>
      ) : (
        <IconBell />
      ),
    },
  ];

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentColab_HeaderTamplate
            title="Project Collaboration"
            route={RouterHome.main_home}
            // icon={<IconUsersGroup />}
            // route2={RouterColab.proyek}
          />
        }
        footer={
          <Footer height={"10vh"} bg={"black"}>
            {/* {value} */}
            <Stack justify="center" h={"100%"}>
              <Grid>
                {listFooter.map((e) => (
                  <Grid.Col key={e.id} span={"auto"} pt={"md"}>
                    <Center>
                      <Stack
                        align="center"
                        spacing={0}
                        onClick={() => {
                          router.replace(e.path);
                          setHotMenu(e.id);
                        }}
                      >
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
            </Stack>
          </Footer>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
