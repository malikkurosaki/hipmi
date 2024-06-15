"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import {
  ActionIcon,
  AppShell,
  Center,
  Flex,
  Footer,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCash,
  IconChartHistogram,
  IconChartPie,
  IconChartPieFilled,
  IconMoneybag,
  IconNotes,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_investasiFooter } from "../g_state";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutMainInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_investasiFooter);

  const listFooter = [
    {
      id: 1,
      name: "Bursa",
      route: RouterInvestasi.main,
      icon: <IconChartHistogram />,
    },
    {
      id: 2,
      name: "Portofolio",
      route: RouterInvestasi.main_porto,
      icon: <IconChartPie />,
    },
    {
      id: 3,
      name: "Saham Saya",
      route: RouterInvestasi.main_investasi,
      icon: <IconCash />,
    },
    {
      id: 4,
      name: "Transaksi",
      route: RouterInvestasi.main_transaksi,
      icon: <IconNotes />,
    },
  ];

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate
            route="/dev/crowd/main"
            title="Investasi"
            // icon={<IconPencilPlus />}
            // route2={"/dev/investasi/create"}
          />
        }
        footer={
          <Footer height={"10vh"} bg={"black"}>
            <Grid align="center" h={"10vh"} pt={"xs"} grow>
              {/* Tampilan Bursa */}
              {listFooter.map((e, k) => (
                <Grid.Col
                  key={e.id}
                  span={3}
                  onClick={() => {
                    router.push(e.route);
                    setActive(k);
                  }}
                >
                  <Center h={"100%"}>
                    <Flex direction={"column"} align={"center"} w={"100%"}>
                      <ActionIcon
                        variant="transparent"
                        c={active === k ? "blue" : "white"}
                      >
                        {e.icon}
                      </ActionIcon>
                      <Text c={active === k ? "blue" : "white"} fz={"xs"}>
                        {e.name}
                      </Text>
                    </Flex>
                  </Center>
                </Grid.Col>
              ))}
            </Grid>
          </Footer>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
