"use client";
import { ActionIcon, AppShell, Flex, Group, Header, Text } from "@mantine/core";
import { HomeView } from ".";
import { IconUserSearch, IconAward, IconQrcode } from "@tabler/icons-react";

export default function HomeLayout({ children }: { children: any }) {
  return (
    <>
      <AppShell
        header={
          <Header height={50} bg={"dark"}>
            <Group position="apart" align="center" h={50} p={"sm"}>
              <ActionIcon>
                <IconUserSearch />
              </ActionIcon>
              <Text color="white" fw={"bold"}>
                HIPMI
              </Text>
              <Flex justify={"flex-end"}>
                <ActionIcon>
                  <IconAward />
                </ActionIcon>
                <ActionIcon>
                  <IconQrcode />
                </ActionIcon>
              </Flex>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
