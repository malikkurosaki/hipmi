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
import ComponentVote_HeaderTamplate from "../component/header_tamplate";
import { useRouter } from "next/navigation";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  IconClick,
  IconHistory,
  IconHome,
  IconReservedLine,
} from "@tabler/icons-react";
import { gs_vote_hotMenu } from "../global_state";
import { useAtom } from "jotai";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

export default function LayoutVote_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterVote.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterVote.status,
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Kontribusi",
      path: RouterVote.kontribusi,
      icon: <IconClick />,
    },
    {
      id: 4,
      name: "Riwayat",
      path: RouterVote.riwayat,
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <AppShell
        header={
          <ComponentVote_HeaderTamplate
            title="Voting"
            route={RouterHome.main_home}
          />
        }
        footer={
          <Footer height={70} bg={"dark"} sx={{ borderTop: "px solid blue" }}>
            <Grid>
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
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
