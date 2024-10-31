"use client";

import {
    ActionIcon,
    AppShell,
    Box,
    Center,
    Divider,
    Drawer,
    Grid,
    Group,
    Menu,
    Navbar,
    NavLink,
    ScrollArea,
    Stack,
    Text,
    Title
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    IconBell,
    IconCircleDot,
    IconCircleDotFilled,
    IconPhone,
    IconUser,
    IconUserCircle
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccentColor, MainColor } from "../_global/color";
import { MODEL_USER } from "../home/model/interface";
import Admin_Logout from "./_admin_global/logout";
import {
    gs_admin_navbar_isActive_dropdown,
    gs_admin_navbar_menu,
    gs_admin_navbar_subMenu,
} from "./_admin_global/new_global_state";
import { newListAdminPage } from "./new_list_page";
import { ComponentAdmin_UIDrawerNotifikasi } from "./notifikasi/ui_drawer_notifikasi";

export function Admin_NewLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: MODEL_USER;
}) {
  const matches = useMediaQuery("(min-width: 1024px)");
  const [dataUser, setDataUser] = useState(user);
  const userRoleId = dataUser.masterUserRoleId;
  const [opened, setOpened] = useState(false);

  // Notifikasi
  const [isDrawerNotifikasi, setDrawerNotifikasi] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint={1024}
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            width={{ lg: 250, md: 200, base: 250 }}
            hiddenBreakpoint={1024}
            hidden={!opened}
            p="xs"
            bg={AccentColor.darkblue}
          >
            {/* Header */}
            <Navbar.Section style={{ color: "white" }}>
              <Stack spacing={"lg"}>
                <Grid>
                  <Grid.Col span={7}>
                    <Title order={3} lineClamp={1}>
                      {userRoleId == "2" ? "Admin" : "Developer"}
                    </Title>
                  </Grid.Col>

                  <Grid.Col span={5}>
                    <Stack h={"100%"} justify="center">
                      <Group position="right" spacing={5}>
                        <ButtonUserCircle dataUser={dataUser} />

                        <ActionIcon
                          variant="transparent"
                          onClick={() => setDrawerNotifikasi(true)}
                        >
                          <IconBell color="white" />
                        </ActionIcon>
                      </Group>
                    </Stack>
                  </Grid.Col>
                </Grid>
                <Divider color="white" />
              </Stack>
            </Navbar.Section>

            {/* Main */}
            <Navbar.Section
              grow
              component={ScrollArea}
              style={{ color: "white", transition: "0.5s" }}
            >
              <Stack style={{ color: "white" }}>
                <NavbarAdmin userRoleId={userRoleId} />
              </Stack>
            </Navbar.Section>

            {/* Footer */}
            <Navbar.Section>
              <Stack>
                <Divider />
                <Group position="center">
                  <Text fs={"italic"} c={"white"} fz={"xs"}>
                    V 1.0.0
                  </Text>
                </Group>
              </Stack>
            </Navbar.Section>
          </Navbar>
        }
      >
        {matches ? (
          children
        ) : (
          <Stack align="center" justify="center" h={"100%"}>
            <Title>Sorry !</Title>
            <Title order={4} align="center">
              View Only Available For Desktop
            </Title>
          </Stack>
        )}
      </AppShell>

      {/*  Notifikasi */}
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              Notifikasi
            </Text>
          </Group>
        }
        opened={isDrawerNotifikasi}
        onClose={() => setDrawerNotifikasi(false)}
        position="right"
        size={"xs"}
      >
        <ComponentAdmin_UIDrawerNotifikasi
          data={[]}
          onLoadReadNotif={(val: any) => {
            // setDataNotif(val);
          }}
          onChangeNavbar={(val: any) => {
            // setActiveId(val.id);
            // setActiveChild(val.childId);
          }}
          onToggleNavbar={setIsNavbarOpen}
          onLoadCountNotif={(val: any) => {
            // setCountNotif(val);
          }}
        />
      </Drawer>
    </>
  );
}

function NavbarAdmin({ userRoleId }: { userRoleId: string }) {
  const router = useRouter();
  //   global state
  const [openDropdown, setOpenDropdown] = useAtom(
    gs_admin_navbar_isActive_dropdown
  );

  const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);

  //   Kalau fix developer navbar, fix juga navbar admin, dan berlaku sebaliknya
  const developerNavbar = newListAdminPage.map((parent) => (
    <Box key={parent.id}>
      <NavLink
        opened={openDropdown && activeId === parent.id}
        styles={{
          icon: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
          label: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
        }}
        style={{
          color: "white",
          transition: "0.5s",
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === parent.id ? "bold" : "normal"}
        label={<Text>{parent.name}</Text>}
        icon={parent.icon}
        onClick={() => {
          setActiveId(parent.id);
          setActiveChildId("");

          parent.path == "" ? setActiveChildId(parent.child[0].id) : "";
          parent.path == ""
            ? router.push(parent.child[0].path)
            : router.push(parent.path);

          openDropdown && activeId === parent.id
            ? setOpenDropdown(false)
            : setOpenDropdown(true);
        }}
        // active={activeId === parent.id}
      >
        {/* Navlink Children */}
        {!_.isEmpty(parent.child) &&
          parent.child.map((child) => (
            <Box key={child.id}>
              <NavLink
                styles={{
                  icon: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                  label: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                }}
                style={{
                  color: "white",
                  transition: "0.5s",
                }}
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                fw={activeChildId === child.id ? "bold" : "normal"}
                label={<Text>{child.name}</Text>}
                icon={
                  activeChildId === child.id ? (
                    <IconCircleDotFilled size={10} />
                  ) : (
                    <IconCircleDot size={10} />
                  )
                }
                onClick={() => {
                  setActiveChildId(child.id);
                  router.push(child.path);
                }}
                active={activeId === child.id}
              />
            </Box>
          ))}
      </NavLink>
    </Box>
  ));

  const bukanDeveloper = newListAdminPage.slice(0, -1);
  const adminNavbar = bukanDeveloper.map((parent) => (
    <Box key={parent.id}>
      <NavLink
        opened={openDropdown && activeId === parent.id}
        styles={{
          icon: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
          label: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
        }}
        style={{
          color: "white",
          transition: "0.5s",
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === parent.id ? "bold" : "normal"}
        label={<Text>{parent.name}</Text>}
        icon={parent.icon}
        onClick={() => {
          setActiveId(parent.id);
          setActiveChildId("");

          parent.path == "" ? setActiveChildId(parent.child[0].id) : "";
          parent.path == ""
            ? router.push(parent.child[0].path)
            : router.push(parent.path);

          openDropdown && activeId === parent.id
            ? setOpenDropdown(false)
            : setOpenDropdown(true);
        }}
        // active={activeId === parent.id}
      >
        {/* Navlink Children */}
        {!_.isEmpty(parent.child) &&
          parent.child.map((child) => (
            <Box key={child.id}>
              <NavLink
                styles={{
                  icon: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                  label: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                }}
                style={{
                  color: "white",
                  transition: "0.5s",
                }}
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                fw={activeChildId === child.id ? "bold" : "normal"}
                label={<Text>{child.name}</Text>}
                icon={
                  activeChildId === child.id ? (
                    <IconCircleDotFilled size={10} />
                  ) : (
                    <IconCircleDot size={10} />
                  )
                }
                onClick={() => {
                  setActiveChildId(child.id);
                  router.push(child.path);
                }}
                active={activeId === child.id}
              />
            </Box>
          ))}
      </NavLink>
    </Box>
  ));

  return userRoleId == "2" ? adminNavbar : developerNavbar;
}

function ButtonUserCircle({ dataUser }: { dataUser: MODEL_USER }) {
  const [isOpenMenuUser, setOpenMenuUser] = useState(false);
  return (
    <>
      <Menu
        withArrow
        arrowPosition="center"
        opened={isOpenMenuUser}
        onChange={setOpenMenuUser}
        shadow="md"
        width={250}
        position="bottom-start"
        styles={{
          dropdown: {
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          },
          item: {
            color: "white",
            ":hover": {
              backgroundColor: "gray",
            },
          },
          arrow: {
            borderTopColor: AccentColor.skyblue,
            borderLeftColor: AccentColor.skyblue,
          },
        }}
      >
        <Menu.Target>
          <ActionIcon variant="transparent" onClick={() => console.log("test")}>
            <IconUserCircle color="white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Stack spacing={5} px={"xs"}>
            <Menu.Item>
              <Grid>
                <Grid.Col span={2}>
                  <IconUser />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1}>{dataUser.username}</Text>
                </Grid.Col>
              </Grid>
            </Menu.Item>
            <Menu.Item>
              <Grid>
                <Grid.Col span={2}>
                  <IconPhone />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1}>+{dataUser.nomor}</Text>
                </Grid.Col>
              </Grid>
            </Menu.Item>

            <Menu.Divider />
            <Center py={"xs"}>
              <Admin_Logout />
            </Center>
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
