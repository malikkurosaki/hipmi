"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Divider,
  Drawer,
  Footer,
  Group,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentGlobal_HeaderTamplate from "../component_global/header_tamplate";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleDot, IconCircleDotFilled, IconHome, IconLetterH, IconLogout } from "@tabler/icons-react";
import {
  RouterAdminAward,
  RouterAdminDashboard,
  RouterAdminDonasi,
  RouterAdminInvestasi,
} from "@/app/lib/router_hipmi/router_admin";
import { useRouter } from "next/navigation";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { Logout } from "@/app_modules/auth";
import { useAtom } from "jotai";
import { gs_admin_hotMenu, gs_admin_subMenu } from "./global_state";
import Admin_Logout from "./component/logout";
import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import _ from "lodash";
import { listAdminPage } from "./list_page";
import { RouterAdminVote } from "@/app/lib/router_admin/router_admin_vote";
import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [active, setActive] = useAtom(gs_admin_hotMenu);
  const [activeChild, setActiveChild] = useAtom(gs_admin_subMenu);



  const navbarItems = listAdminPage.map((e, i) => (
    <Box key={e.id}>
      <NavLink
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={active === e.id ? "bold" : "normal"}
        icon={e.icon}
        label={<Text size={"sm"}>{e.name}</Text>}
        onClick={() => {
          setActive(e.id);
          setActiveChild(null);
          e.path === "" ? router.push(e.child[0].path) : router.push(e.path);
          e.path === "" ? setActiveChild(e.child[0].id) : "";
        }}
      >
        {_.isEmpty(e.child) ? (
          ""
        ) : (
          <Box>
            {e.child.map((v, ii) => (
              <Box key={v.id}>
                <NavLink
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  fw={activeChild === v.id ? "bold" : "normal"}
                  label={<Text>{v.name}</Text>}
                  icon={activeChild === v.id ? <IconCircleDotFilled size={10}/> : <IconCircleDot size={10}/> }
                  onClick={() => {
                    setActive(e.id);
                    setActiveChild(v.id);
                    router.push(v.path);
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </NavLink>
    </Box>
  ));

  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="sm"
        
        navbar={
          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Navbar
              width={{ lg: 200, md: 200, sm: 200, base: 200 }}
              hiddenBreakpoint="md"
              hidden={!opened}
              p="xs"
              bg={"gray.2"}
            >
              {navbarItems}
            </Navbar>
          </MediaQuery>
        }
        header={
          <Header height={50} bg={"gray.2"}>
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
                <Text fw={"lighter"}>Dashboard Admin</Text>
                <Title order={4}> HIPMI</Title>
                {/* <Group>
                  {listAdminPage.map((e) => (
                    <Text key={e.id}  onClick={() => router.push(e.route)}>
                      {e.name}
                    </Text>
                  ))}
                </Group> */}
                <Admin_Logout />
              </Group>
            </MediaQuery>
          </Header>
        }
      >
        {/* {JSON.stringify(active)} */}

        {children}
      </AppShell>
      <Drawer opened={opened} onClose={() => setOpened(false)} size={"50%"}>
        <Stack spacing={"xl"}>
          {listAdminPage.map((e) => (
            <Text key={e.id} onClick={() => router.push(e.path)}>
              {e.name}
            </Text>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
