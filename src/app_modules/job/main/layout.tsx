"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Grid,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentJob_HeaderTamplate from "../component/header_tamplate";
import { IconHistory, IconHome, IconReservedLine } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { useAtom } from "jotai";
import { gs_job_hot_menu } from "../global_state";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutJob_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenuId, setHotMenuId] = useAtom(gs_job_hot_menu);
  const [isLoading, setLoading] = useState(false);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterJob.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterJob.status,
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Arsip",
      path: RouterJob.arsip,
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentJob_HeaderTamplate
            title="Job Vacancy"
            route={RouterHome.main_home}
          />
        }
        footer={
          <Footer height={"10vh"} bg={"dark"}>
            <Stack justify="center" h={"100%"}>
              <Grid>
                {listFooter.map((e) => (
                  <Grid.Col
                    key={e.id}
                    span={"auto"}
                    pt={"md"}
                    onClick={() => {
                      // setLoading(true);
                      // setTimeout(() => router.replace(e.path), 3000);
                      router.replace(e.path);
                      setHotMenuId(e.id);
                      // setTimeout(() => setLoading(false), 1000);
                    }}
                  >
                    <Center>
                      <Stack align="center" spacing={0}>
                        <ActionIcon
                          variant="transparent"
                          c={hotMenuId === e.id ? "blue" : "white"}
                        >
                          {e.icon}
                          {/* {isLoading && hotMenuId === e.id ? (
                            <Loader />
                          ) : (
                            e.icon
                          )} */}
                        </ActionIcon>
                        <Text fz={10} c={hotMenuId === e.id ? "blue" : "white"}>
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
