"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import {
  IconBell,
  IconCircleDot,
  IconCircleDotFilled,
  IconDashboard
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth_Logout } from "../auth/fun/fun_logout";
import { gs_kodeId } from "../auth/state/state";
import { ComponentGlobal_NotifikasiBerhasil } from "../component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import Admin_Logout from "./component_global/logout";
import { gs_admin_hotMenu, gs_admin_subMenu } from "./global_state";
import { listAdminPage } from "./list_page";

export default function AdminLayout({
  userRole,
  children,
}: {
  userRole: string;
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [active, setActive] = useAtom(gs_admin_hotMenu);
  const [activeChild, setActiveChild] = useAtom(gs_admin_subMenu);
  const [loading, setLoading] = useState(false);
  const [kodeId, setKodeId] = useAtom(gs_kodeId);

  async function onClickLogout() {
    // await auth_Logout(kodeId).then((res) => {
    //   ComponentGlobal_NotifikasiBerhasil("Berhasil Logout");
    // });
    await auth_Logout(kodeId).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setKodeId("");
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });
  }

  const navbarItems = listAdminPage.map((e, i) => (
    <Box key={e.id}>
      <NavLink
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={active === e.id ? "bold" : "normal"}
        icon={
          // active === e.id ? loading ? <Loader size={10} /> : e.icon : e.icon
          e.icon
        }
        label={<Text size={"sm"}>{e.name}</Text>}
        onClick={() => {
          setLoading(true);
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
                  icon={
                    activeChild === v.id ? (
                      <IconCircleDotFilled size={10} />
                    ) : (
                      <IconCircleDot size={10} />
                    )
                  }
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

  const bukanDeveloper = listAdminPage.slice(0, -1);
  const notAdminDev = bukanDeveloper.map((e) => (
    <Box key={e.id}>
      <NavLink
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={active === e.id ? "bold" : "normal"}
        icon={
          // active === e.id ? loading ? <Loader size={10} /> : e.icon : e.icon
          e.icon
        }
        label={<Text size={"sm"}>{e.name}</Text>}
        onClick={() => {
          setLoading(true);
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
                  icon={
                    activeChild === v.id ? (
                      <IconCircleDotFilled size={10} />
                    ) : (
                      <IconCircleDot size={10} />
                    )
                  }
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

  const navbarAdmin = (
    <Box>
      <NavLink
        c="orange"
        icon={<IconDashboard />}
        label="Developer"
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Box>
  );

  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="sm"
        navbar={
          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Navbar
              h={"95%"}
              width={{ lg: 250, md: 200, sm: 200, base: 250 }}
              hiddenBreakpoint="md"
              hidden={!opened}
              p="xs"
              bg={"gray.2"}
            >
              {/* <Navbar.Section>
                <Center h={50}>
                  <Title order={4} ff={"sans-serif"}>
                    Dashboard Admin
                  </Title>
                </Center>
                <Divider />
              </Navbar.Section> */}
              <Navbar.Section grow component={ScrollArea}>
                <Stack>{userRole === "3" ? navbarItems : notAdminDev}</Stack>
              </Navbar.Section>
              <Navbar.Section>
                <Stack>
                  <Divider />
                  <Group position="apart">
                    <Text fs={"italic"} c={"gray"} fz={"xs"}>
                      V 1.0.0
                    </Text>
                    <Admin_Logout />
                  </Group>
                </Stack>
              </Navbar.Section>
            </Navbar>
          </MediaQuery>
        }
        header={
          <Header height={"5vh"} bg={"gray.2"}>
            {/* Web View */}
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
              <Group position="apart" align="center" h={"100%"} px={"md"}>
                <Text fw={"lighter"}>Dashboard Admin</Text>
                <Title order={4}> HIPMI</Title>
                {/* <Group>
                  {listAdminPage.map((e) => (
                    <Text key={e.id}  onClick={() => router.push(e.route)}>
                      {e.name}
                    </Text>
                  ))}
                </Group> */}
                {/* <Admin_Logout /> */}
                <ActionIcon radius={"xl"}>
                  <IconBell />
                </ActionIcon>
              </Group>
            </MediaQuery>

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
                {/* <Admin_Logout /> */}
                <ActionIcon>
                  <IconBell />
                </ActionIcon>
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
