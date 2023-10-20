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
  IconChartPieFilled,
  IconPencilPlus,
} from "@tabler/icons-react";
import React from "react";

export default function LayoutMainInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <Grid.Col span={6}>
                <Center>
                  <Flex direction={"column"} align={"center"} w={"100%"}>
                    <ActionIcon variant="transparent">
                      <IconChartHistogram />
                    </ActionIcon>
                    <Text c={"white"}>Bursa</Text>
                  </Flex>
                </Center>
              </Grid.Col>
              <Grid.Col span={6}>
                <Center>
                  <Flex direction={"column"} align={"center"} w={"100%"}>
                    <ActionIcon variant="transparent">
                      <IconChartPieFilled />
                    </ActionIcon>
                    <Text c={"white"}>Portofolio</Text>
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
