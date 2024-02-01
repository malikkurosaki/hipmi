"use client";

import {
  AppShell,
  Navbar,
  MediaQuery,
  Aside,
  Footer,
  Header,
  Burger,
  Text,
  useMantineTheme,
  Box,
  NavLink,
  Divider,
  Group,
  Title,
  ActionIcon,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-simple-toasts";

export default function AdminMain_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);

  const listAdminPage = [
    {
      id: 1,
      name: "Dashboard",
      // route: RouterAdminDashboard.main_admin,
      child: [
        
      ],
    },
    {
      id: 2,
      name: "Investasi",
      // route: RouterAdminInvestasi.main_investasi,
      child: [
        {
          id: 1,
          name: "Child Investasi",
        },
      ],
    },
    {
      id: 3,
      name: "Donasi",
      // route: RouterAdminDonasi.main_donasi,
      child: [
        {
          id: 1,
          name: "Child Don 1",
        },
        {
          id: 1,
          name: "Child DOn 2",
        },
      ],
    },
    {
      id: 4,
      name: "Event",
      // route: RouterAdminEvent.main_event,
      child: [
        {
          id: 1,
          name: "Child Event",
        },
      ],
    },
  ];

  return (
    <>
      <AppShell
        padding={"sm"}
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
              {listAdminPage.map((e, i) => (
                <Box key={i}>
                  <NavLink
                    sx={{
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    fw={active === i ? "bold" : "normal"}
                    label={e.name}
                    onClick={() => {
                      setActive(i);
                      // router.push(e.route);
                      toast(e.name);
                    }}
                  >
                    {_.isEmpty(e.child) ? (
                      ""
                    ) : (
                      <Box>
                        {e.child.map((v, ii) => (
                          <Box key={ii}>
                            <NavLink label={v.name} />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </NavLink>
                </Box>
              ))}
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
                  // onClick={() => router.push(RouterHome.main_home)}
                >
                  {/* <IconLogout color="red" />  */}
                  <IconLogout />
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
                {/* <Admin_Logout/> */}
                <IconLogout />
              </Group>
            </MediaQuery>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
