"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Drawer,
  Footer,
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
        // footer={
        //   <Footer height={50}>
        //     {/* Web View */}
        //     <MediaQuery smallerThan={"md"}  styles={{ display: "none" }}>
        //       <Group position="apart">
        //         <Text>1</Text>
        //         <Text>1</Text>
        //         <Text>1</Text>
        //       </Group>
        //     </MediaQuery>

        //     {/* <MediaQuery smallerThan={"md"}  styles={{ display: "none", borderStyle: "transparent" }}>
        //      <Text>ok</Text>
        //     </MediaQuery> */}
        //   </Footer>
        // }
        header={
          <Header height={50}>
            {/* Mobile View */}
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Group h={50} align="center" px={"md"} position="apart">
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
                <Title order={6}>Dashboard Admin</Title>
                <ActionIcon
                  variant="transparent"
                  onClick={() => router.push(RouterHome.main_home)}
                >
                  <IconLogout color="red" />
                </ActionIcon>
              </Group>
            </MediaQuery>

            {/* Web View */}
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
              <Group position="apart" align="center" h={50} px={"md"}>
                <Title order={4}>Dashboard Admin</Title>
                <Group>
                  {listAdminPage.map((e) => (
                    <Text key={e.id}  onClick={() => router.push(e.route)}>
                      {e.name}
                    </Text>
                  ))}
                </Group>
                <ActionIcon
                  variant="transparent"
                  onClick={() => router.push(RouterHome.main_home)}
                >
                  <IconLogout color="red" />
                </ActionIcon>
              </Group>
            </MediaQuery>
          </Header>
        }
      >
        {children}
      </AppShell>
      <Drawer opened={opened} onClose={() => setOpened(false)} size={"50%"}>
        <Stack spacing={"xl"}>
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
