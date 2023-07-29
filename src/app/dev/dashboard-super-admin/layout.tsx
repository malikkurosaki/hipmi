"use client";
import {
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Header,
  MediaQuery,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import router from "next/router";
import { useState } from "react";

export default function LayoutDashboardSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
                <Text>Dashboard Super Admin</Text>
                <Button>Super Admin</Button>
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
