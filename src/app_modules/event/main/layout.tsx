"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ComponentEvent_HeaderTamplate from "../component/header_tamplate";
import {
  IconCalendarEvent,
  IconCirclePlus,
  IconHistory,
  IconHome,
  IconTimelineEvent,
  IconTimelineEventText,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_event_hotMenu, gs_event_status } from "../global_state";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutEvent_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);
  const listFooter = [
    {
      id: "1",
      name: "Beranda",
      path: RouterEvent.beranda,
      icon: <IconHome />,
    },

    {
      id: "2",
      name: "Status",
      path: RouterEvent.status_page,
      icon: <IconTimelineEventText />,
    },
    {
      id: "3",
      name: "Kontribusi",
      path: RouterEvent.kontribusi,
      icon: <IconCalendarEvent />,
    },
    {
      id: "4",
      name: "Riwayat",
      path: RouterEvent.riwayat,
      icon: <IconHistory />,
    },
  ];
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentEvent_HeaderTamplate
            title="Event"
            route={RouterHome.main_home}
          />
        }
        footer={
          <Footer
            height={"10vh"}
            bg={"dark"}
            sx={{ borderTop: "px solid blue" }}
          >
            <Stack justify="center" h={"100%"}>
              <Grid >
                {listFooter.map((e, i) => (
                  <Grid.Col
                    key={e.id}
                    span={"auto"}
                    pt={"md"}
                    onClick={() => {
                      router.replace(e.path);
                      setHotMenu(i);
                    }}
                  >
                    <Center>
                      <Stack align="center" spacing={0}>
                        <ActionIcon
                          variant="transparent"
                          c={hotMenu === i ? "blue" : "white"}
                        >
                          {e.icon}
                        </ActionIcon>
                        <Text fz={10} c={hotMenu === i ? "blue" : "white"}>
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
