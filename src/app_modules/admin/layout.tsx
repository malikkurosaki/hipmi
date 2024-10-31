"use client";

import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Center,
  Divider,
  Drawer,
  Group,
  Header,
  Indicator,
  MediaQuery,
  NavLink,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBell,
  IconCircleDot,
  IconCircleDotFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MODEL_USER } from "../home/model/interface";
import { MODEL_NOTIFIKASI } from "../notifikasi/model/interface";
import Admin_Logout from "./_admin_global/logout";
import {
  gs_admin_hotMenu,
  gs_admin_subMenu,
  gs_layout_admin_isNavbarOpen,
} from "./global_state";
import { listAdminPage } from "./list_page";
import adminNotifikasi_getByUserId from "./notifikasi/fun/get/get_notifikasi_by_user_id";
import { ComponentAdmin_UIDrawerNotifikasi } from "./notifikasi/ui_drawer_notifikasi";
import { AccentColor, MainColor } from "../_global/color";

export default function AdminLayout({
  children,
  listNotif,
  dataUser,
  countNotifikasi,
}: {
  children: React.ReactNode;
  listNotif: MODEL_NOTIFIKASI[];
  dataUser: MODEL_USER;
  countNotifikasi: number;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [activeId, setActiveId] = useAtom(gs_admin_hotMenu);
  const [activeChild, setActiveChild] = useAtom(gs_admin_subMenu);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(dataUser);
  const userRoleId = user.masterUserRoleId;

  const [isNotif, setIsNotif] = useState(false);
  const [dataNotif, setDataNotif] = useState(listNotif);

  const [countNotif, setCountNotif] = useState(countNotifikasi);
  const [isNavbarOpen, setIsNavbarOpen] = useAtom(gs_layout_admin_isNavbarOpen);

  const developerNavbar = listAdminPage.map((e, i) => (
    <Box key={e.id}>
      <NavLink
        style={{ color: "white" }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === e.id ? "bold" : "normal"}
        icon={
          // active === e.id ? loading ? <Loader size={10} /> : e.icon : e.icon
          e.icon
        }
        label={<Text size={"sm"}>{e.name}</Text>}
        onClick={() => {
          setLoading(true);
          setActiveId(e.id);
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
                  style={{ color: "white" }}
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
                    setActiveId(e.id);
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
  const adminNavbar = bukanDeveloper.map((e) => (
    <Box key={e.id}>
      <NavLink
        style={{ color: "white" }}
        opened={e?.id === activeId && isNavbarOpen ? true : false}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === e.id ? "bold" : "normal"}
        icon={e.icon}
        label={<Text size={"sm"}>{e.name}</Text>}
        onClick={() => {
          setLoading(true);
          setActiveId(e.id);
          setActiveChild(null);
          e.path === "" ? router.push(e.child[0].path) : router.push(e.path);
          e.path === "" ? setActiveChild(e.child[0].id) : "";

          setIsNavbarOpen(true);
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
                    setActiveId(e.id);
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

  async function onLoadNotifikasi() {
    const loadNotif = await adminNotifikasi_getByUserId();
    setDataNotif(loadNotif as any);
  }

  useEffect(() => {
    mqtt_client.subscribe("ADMIN");

    mqtt_client.on("message", (topic: any, message: any) => {
      const data = JSON.parse(message.toString());
      // console.log(data);
      setCountNotif(countNotif + data.count);
    });
  }, [countNotif]);

  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="sm"
        header={
          <Header
            height={"6vh"}
            bg={AccentColor.darkblue}
            style={{ color: "white", borderStyle: "none" }}
          >
            {/* Web View */}
            <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
              <Group position="apart" align="center" h={"100%"} px={"md"}>
                <Title order={3}>Dashboard Admin</Title>

                <Group>
                  <ActionIcon
                    radius={"xl"}
                    onClick={() => {
                      setIsNotif(true);
                      onLoadNotifikasi();
                    }}
                  >
                    <Indicator
                      processing
                      label={<Text fz={10}>{countNotif}</Text>}
                    >
                      <IconBell color="white" />
                    </Indicator>
                  </ActionIcon>
                  <Divider orientation="vertical" color="dark" />
                  <Group>
                    <Text>{user?.username}</Text>
                    <IconUserSquareRounded />
                  </Group>
                </Group>
              </Group>
            </MediaQuery>

            {/* Mobile View */}
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
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
        navbar={
          <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <Navbar
              h={"94vh"}
              width={{ lg: 250, md: 200, sm: 200, base: 250 }}
              hiddenBreakpoint="md"
              hidden={!opened}
              p="xs"
              bg={AccentColor.darkblue}
            >
              <Navbar.Section
                grow
                component={ScrollArea}
                style={{ color: "white", transition: "0.5s" }}
              >
                <Stack style={{ color: "white" }}>
                  {userRoleId === "3" ? developerNavbar : adminNavbar}
                </Stack>
              </Navbar.Section>
              <Navbar.Section>
                <Stack>
                  <Divider />
                  <Group position="apart">
                    <Text fs={"italic"} c={"white"} fz={"xs"}>
                      V 1.0.0
                    </Text>
                    <Admin_Logout />
                  </Group>
                </Stack>
              </Navbar.Section>
            </Navbar>
          </MediaQuery>
        }
      >
        {children}
      </AppShell>

      {/* Drawer Mobile View */}
      <Drawer opened={opened} onClose={() => setOpened(false)} size={"50%"}>
        <Stack spacing={"xl"}>
          {listAdminPage.map((e) => (
            <Text key={e.id} onClick={() => router.push(e.path)}>
              {e.name}
            </Text>
          ))}
        </Stack>
      </Drawer>

      {/* Drawer Notifikasi */}
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              Notifikasi
            </Text>
          </Group>
        }
        opened={isNotif}
        onClose={() => setIsNotif(false)}
        position="right"
        size={"xs"}
      >
        <ComponentAdmin_UIDrawerNotifikasi
          data={dataNotif}
          onLoadReadNotif={(val: any) => {
            setDataNotif(val);
          }}
          onChangeNavbar={(val: any) => {
            setActiveId(val.id);
            setActiveChild(val.childId);
          }}
          onToggleNavbar={setIsNavbarOpen}
          onLoadCountNotif={(val: any) => {
            setCountNotif(val);
          }}
        />
      </Drawer>
    </>
  );
}
