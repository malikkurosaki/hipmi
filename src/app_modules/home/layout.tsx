"use client";
import { ActionIcon, AppShell, Flex, Group, Header, Text } from "@mantine/core";
import { HomeView } from ".";
import { IconUserSearch, IconAward, IconQrcode } from "@tabler/icons-react";
import { Logout } from "../auth";

export default function HomeLayout({ children }: { children: any }) {
  return (
    <>
      <AppShell
        header={
          <Header height={50} bg={"dark"}>
            <Group position="apart" align="center" h={50} p={"sm"}>
              <Group spacing={"sm"}>
                <ActionIcon>
                  <IconUserSearch />
                </ActionIcon>
                <ActionIcon>
                  <IconAward />
                </ActionIcon>
              </Group>
              <Text color="white" fw={"bold"}>
                HIPMI
              </Text>
              <Group spacing={"sm"}>
                <ActionIcon>
                  <IconQrcode />
                </ActionIcon>
                <Logout />
              </Group>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
