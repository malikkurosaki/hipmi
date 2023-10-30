"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import HeaderTamplate from "../../component/header_tamplate";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import {
  RouterAdminAward,
  RouterAdminDashboard,
  RouterAdminInvestasi,
} from "@/app/lib/router_hipmi/router_admin";
import { useRouter } from "next/navigation";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const listAdminPage = [
    {
      id: 1,
      name: "Dashboard",
      route: RouterAdminDashboard.main_admin,
    },
    {
      id: 2,
      name: "Investasi",
      route: RouterAdminInvestasi.main_investasi,
    },
    {
      id: 3,
      name: "Award",
      route: RouterAdminAward.main_award,
    },
  ];

  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group h={50} align="center" px={"md"} position="apart">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Title order={6}>Dashboard Admin</Title>
              <ActionIcon  variant="transparent" onClick={() => router.push(RouterHome.main_home)}>
                <IconLogout color="red" />
              </ActionIcon>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
      <Drawer opened={opened} onClose={() => setOpened(false)} size={"50%"}>
        <Stack spacing={"lg"}>
          {listAdminPage.map((e) => (
            <Text key={e.id} onClick={() => router.push(e.route)}>
              {e.name}
            </Text>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
