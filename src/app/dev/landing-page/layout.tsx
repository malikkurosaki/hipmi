"use client";
import {
  ActionIcon,
  AppShell,
  Aside,
  AspectRatio,
  Box,
  Burger,
  Button,
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
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        // navbarOffsetBreakpoint="sm"
        // asideOffsetBreakpoint="sm"
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ height: "100%" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group position="apart">
              <Image maw={150}  src="/img/logo_1.png" alt="Random image" />
                <Box>
                  <Flex gap={"xl"}>
                    <Text>Beranda</Text>
                    <Text>Tentang Kami</Text>
                    <Text>Informasi</Text>
                    <Text>Galeri</Text>
                  </Flex>
                </Box>
                <Menu position="bottom">
                  <Menu.Target>
                    <Button>Login</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => router.push("/dev/login")}>
                      Login
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/dev/dashboard-admin")}
                    >
                      Dashboard Admin
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/dev/dashboard-super-admin")}
                    >
                      Dashboard Super Admin
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
