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
  Loader,
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
import {
  IconCheck,
  IconCircleDot,
  IconCircleDotFilled,
  IconDashboard,
  IconHome,
  IconLetterH,
  IconLogout,
} from "@tabler/icons-react";
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
import { gs_kodeId } from "../auth/state/state";
import { auth_Logout } from "../auth/fun/fun_logout";
import { ComponentGlobal_NotifikasiBerhasil } from "../component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";

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
              width={{ lg: 200, md: 200, sm: 200, base: 200 }}
              hiddenBreakpoint="md"
              hidden={!opened}
              p="xs"
              bg={"gray.2"}
            >
              <Navbar.Section>
                <Stack>
                  {userRole === "3" ? navbarItems : notAdminDev}
                  {/* <NavLink icon={<IconCheck />} label="Create Admin" /> */}
                </Stack>
              </Navbar.Section>
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
