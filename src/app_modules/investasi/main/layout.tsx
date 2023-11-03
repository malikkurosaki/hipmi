"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
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
      name: "Investasi",
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
      <AppShell
        header={
          <HeaderTamplate
            route="/dev/crowd/main"
            title="Investasi"
            icon={<IconPencilPlus />}
            route2={"/dev/investasi/create"}
          />
        }
        footer={
          <Footer height={70} bg={"dark.4"}>
            <Grid align="center" h={60} pt={"xs"}>
              {/* Tampilan Bursa */}
              {listFooter.map((e, k) => (
                <Grid.Col
                  key={e.id}
                  span={3}
                  onClick={() => {
                    router.push(e.route);
                    setActive(k)
                  }}
                >
                  <Center>
                    <Flex direction={"column"} align={"center"} w={"100%"}>
                      <ActionIcon variant="transparent" c={active === k ? "green" : "white"}>{e.icon}</ActionIcon>
                      <Text c={active === k ? "green" : "white"}>{e.name}</Text>
                    </Flex>
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
