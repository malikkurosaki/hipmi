"use client";
import {
  ActionIcon,
  AppShell,
  Aside,
  AspectRatio,
  Box,
  Burger,
  Button,
  Drawer,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  HoverCard,
  Image,
  MediaQuery,
  Menu,
  Navbar,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {HiOutlineLogin} from "react-icons/hi"

export default function LayoutLandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //menunggu rendering client karena tampilan di mulai dirender pada server
  const [waiting, setWaiting] = useState(false);
  useShallowEffect(() => {
    if (window) setWaiting(true);
  }, []);

  if (!waiting) return <></>;

  return (
    <>
      <AppShell
        // m={{base: -16, sm: -16}}
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <MediaQuery largerThan="xs" styles={{ display: "none" }}>
            <Drawer
              // withCloseButton={false}
              closeOnClickOutside
              opened={opened}
              onClose={() => {
                setOpened(false);
              }}
            >
              <Flex gap={"xl"} direction={"column"}>
                <Text>Beranda</Text>
                <Text>Tentang Kami</Text>
                <Text>Informasi</Text>
                <Text>Galeri</Text>
              </Flex>
            </Drawer>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 70, md: 70 }} p="md" sx={{backgroundColor: "transparent", border: "transparent"}}>
           <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Group position="apart">
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color="white"
                    mr="xl"
                  />
                   <Group>
                    <Title order={5}>HIPMI Badung</Title>
                   </Group>
                  <Menu position="bottom">
                    <Menu.Target>
                     <ActionIcon bg={"white"} radius={50}>
                      <HiOutlineLogin/>
                     </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => router.push("/dev/auth/login")}>
                        Login
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => router.push("/dev/dashboard-admin")}
                      >
                        Dashboard Admin
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          router.push("/dev/dashboard-super-admin")
                        }
                      >
                        Dashboard Super Admin
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </MediaQuery>

              <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
                <Group position="apart">
                <Group>
                    <Title order={3}>HIPMI Badung</Title>
                   </Group>
                  <Box hidden={opened ? true : false}>
                    <Flex gap={"xl"} >
                      <Text>Beranda</Text>
                      <Text>Tentang Kami</Text>
                      <Text>Informasi</Text>
                      <Text>Galeri</Text>
                    </Flex>
                  </Box>

                  <Menu position="bottom">
                    <Menu.Target>
                    <ActionIcon bg={"white"} radius={50} size={40}>
                      <HiOutlineLogin/>
                     </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => router.push("/dev/auth/login")}>
                        Login
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => router.push("/dev/dashboard-admin")}
                      >
                        Dashboard Admin
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          router.push("/dev/dashboard-super-admin")
                        }
                      >
                        Dashboard Super Admin
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
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
