"use client";

import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Divider,
  Drawer,
  Group,
  Header,
  Indicator,
  MediaQuery,
  NavLink,
  Navbar,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBell,
  IconCheck,
  IconChecks,
  IconCircleDot,
  IconCircleDotFilled,
  IconDashboard,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth_Logout } from "../auth/fun/fun_logout";
import { gs_kodeId } from "../auth/state/state";
import { ComponentGlobal_NotifikasiBerhasil } from "../component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import Admin_Logout from "./component_global/logout";
import {
  gs_admin_hotMenu,
  gs_admin_subMenu,
  gs_layout_admin_isNavbarOpen,
} from "./global_state";
import { listAdminPage } from "./list_page";
import { MODEL_NOTIFIKASI } from "../notifikasi/model/interface";
import { MODEL_USER } from "../home/model/interface";
import { useHover, useShallowEffect, useToggle } from "@mantine/hooks";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";
import adminNotifikasi_funUpdateIsReadById from "./notifikasi/fun/update/fun_update_is_read_by_id";
import adminNotifikasi_getByUserId from "./notifikasi/fun/get/get_notifikasi_by_user_id";
import adminNotifikasi_countNotifikasi from "./notifikasi/fun/count/count_is_read";
import mqtt_client from "@/util/mqtt_client";

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
          <Header height={"6vh"} bg={"gray.2"}>
            {/* Web View */}
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
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
                      <IconBell />
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
        navbar={
          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Navbar
              h={"94vh"}
              width={{ lg: 250, md: 200, sm: 200, base: 250 }}
              hiddenBreakpoint="md"
              hidden={!opened}
              p="xs"
              bg={"gray.2"}
            >
              <Navbar.Section grow component={ScrollArea}>
                <Stack>
                  {userRoleId === "3" ? developerNavbar : adminNavbar}
                </Stack>
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
            {/* <Button compact radius={"xl"} fz={10}>Tandai terliha</Button> */}
          </Group>
        }
        opened={isNotif}
        onClose={() => setIsNotif(false)}
        position="right"
        size={"xs"}
      >
        <DrawerNotifikasi
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

function DrawerNotifikasi({
  data,
  onLoadReadNotif,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
}: {
  data: MODEL_NOTIFIKASI[];
  onLoadReadNotif: (val: any) => void;
  onChangeNavbar: (val: any) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
}) {
  const router = useRouter();

  if (_.isEmpty(data)){
    return (
      <>
        <Center>
          <Text c={"gray"} fz={"xs"}>
            Tidak ada notifikasi
          </Text>
        </Center>
      </>
    );
  }
 

  return (
    <>
      <Paper h={"100%"}>
        <Stack>
          {data.map((e, i) => (
            <Card
              key={e?.id}
              // withBorder
              bg={e?.isRead ? "gray.1" : "gray.4"}
              sx={{
                borderColor: "gray",
                borderStyle: "solid",
                borderWidth: "0.5px",
                ":hover": {
                  borderColor: "gray",
                  borderStyle: "solid",
                  borderWidth: "1.5px",
                },
              }}
              onClick={async () => {
                e?.kategoriApp === "JOB" &&
                  findRouterJob({
                    data: e,
                    router: router,
                    onChangeNavbar2: (val: any) => {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar2: onToggleNavbar,
                  });

                const updateIsRead = await adminNotifikasi_funUpdateIsReadById({
                  notifId: e?.id,
                });

                if (updateIsRead) {
                  const loadCountNotif =
                    await adminNotifikasi_countNotifikasi();
                  onLoadCountNotif(loadCountNotif);

                  const loadDataNotif = await adminNotifikasi_getByUserId();
                  onLoadReadNotif(loadDataNotif);
                } else {
                  return null;
                }

                // callBackIsNotifikasi(false);
              }}
            >
              <Card.Section p={"sm"}>
                <Group position="apart">
                  <Text fw={"bold"} fz={"xs"}>
                    # {e?.kategoriApp}
                  </Text>
                  {e?.status ? <Badge w={70}>{e?.status}</Badge> : ""}
                </Group>
              </Card.Section>
              <Card.Section p={"sm"}>
                <Text lineClamp={2}>{e?.pesan}</Text>
              </Card.Section>
              <Card.Section p={"sm"}>
                <Group position="apart">
                  <Text fz={10} color="gray">
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "long",
                    }).format(e?.createdAt)}

                    <Text span inherit fz={10} color="gray">
                      {", "}
                      {new Intl.DateTimeFormat("id-ID", {
                        timeStyle: "short",
                      }).format(e?.createdAt)}
                    </Text>
                  </Text>
                  {e?.isRead ? (
                    <Group spacing={5}>
                      <IconChecks color="gray" size={10} />
                      <Text fz={10} color="gray">
                        Sudah dilihat
                      </Text>
                    </Group>
                  ) : (
                    <Group spacing={5}>
                      <IconCheck color="gray" size={10} />
                      <Text fz={10} color="gray">
                        Belum dilihat
                      </Text>
                    </Group>
                  )}
                </Group>
              </Card.Section>
            </Card>
          ))}
        </Stack>
      </Paper>
    </>
  );
}

async function findRouterJob({
  data,
  router,
  onChangeNavbar2,
  onToggleNavbar2,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onChangeNavbar2: (val: any) => void;
  onToggleNavbar2: (val: any) => void;
}) {
  const routeName = "/dev/admin/job/child/";
  router.push(routeName + _.lowerCase(data.status));
  onChangeNavbar2({
    id: 6,
    childId: 63,
  });
  onToggleNavbar2(true);
}
