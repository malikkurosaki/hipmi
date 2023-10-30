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
  IconChartHistogram,
  IconChartPie,
  IconChartPieFilled,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_investasiFooter } from "../g_state";

export default function LayoutMainInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);

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
          <Footer height={70} bg={"dark"}>
            <Grid align="center" h={60} pt={"xs"}>
              {/* Tampilan Bursa */}
              <Grid.Col
                span={6}
                onClick={() => {
                  router.push("/dev/investasi/main");
                  setChangeColor(false);
                }}
              >
                <Center>
                  <Flex direction={"column"} align={"center"} w={"100%"}>
                    <ActionIcon variant="transparent">
                      <IconChartHistogram  color={changeColor ? "white" : "green"}/>
                    </ActionIcon>
                    <Text c={changeColor ? "white" : "green"}>Bursa</Text>
                  </Flex>
                </Center>
              </Grid.Col>
              {/* Tampilan Portofolio */}
              <Grid.Col
                span={6}
                onClick={() => {
                  router.push("/dev/investasi/main/portofolio");
                  setChangeColor(true);
                }}
              >
                <Center>
                  <Flex direction={"column"} align={"center"} w={"100%"}>
                    <ActionIcon variant="transparent">
                      <IconChartPie  color={changeColor ?  "green" : "white"}/>
                    </ActionIcon>
                    <Text c={changeColor ? "green" : "white"}>Portofolio</Text>
                  </Flex>
                </Center>
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
