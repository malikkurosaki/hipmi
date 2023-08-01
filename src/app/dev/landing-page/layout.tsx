"use client";
import { WARNA } from "@/fun/color_tone";
import {
  ActionIcon,
  AppShell,
  Aside,
  AspectRatio,
  Box,
  Burger,
  Button,
  Container,
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
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillAccountBook } from "react-icons/ai";
import { HiOutlineLogin } from "react-icons/hi";
import { IconCaretDown, IconLogin } from "@tabler/icons-react";
import { HeaderButton } from "@/modules/landing_page";

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
              withCloseButton={false}
              size={"70%"}
              closeOnClickOutside
              opened={opened}
              overlayProps={{ opacity: 0.2, blur: 4 }}
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
          <Header
            height={{ base: 70, md: 70 }}
            p={"md"}
            sx={{
              border: "transparent",
            }}
          >
            {/* Mobile View */}
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Group position="apart">
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={WARNA.hijau_muda}
                  mr="md"
                />
                <Group>
                  <Title order={5}>HIPMI Badung</Title>
                </Group>
                <Menu position="bottom">
                  <Menu.Target>
                    <ActionIcon bg={WARNA.hijau_muda} size={30} radius={50}>
                      <IconLogin color="white" size={20} />
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
                      onClick={() => router.push("/dev/dashboard-super-admin")}
                    >
                      Dashboard Super Admin
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </MediaQuery>

            {/* Web View */}
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Group position="apart" >
                  <Group>
                    <Title
                      order={2}
                      color={WARNA.hijau_muda}
                      sx={{ fontFamily: "-moz-initial" }}
                    >
                      HIPMI Badung
                    </Title>
                    {/* <Image  src={"/img/logo_1.png"} alt="Logo"  /> */}
                  </Group>
                  <HeaderButton />
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
