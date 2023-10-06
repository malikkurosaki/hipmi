"use client";

import { Logout } from "@/app_modules/auth";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconUserSearch, IconAward, IconQrcode, IconArrowLeft, IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function KatalogLayout({ children }: { children: any }) {
    const router = useRouter()
  return (
    <>
      <AppShell
        header={
          <Header height={50} bg={"dark"}>
            <Group position="apart" align="center" h={50} p={"sm"}>
              <Group spacing={"sm"}>
                <ActionIcon variant="transparent" onClick={() => router.push("/dev/home")}>
                  <IconArrowLeft/>
                </ActionIcon>
                {/* <ActionIcon>
                  <IconAward />
                </ActionIcon> */}
              </Group>
              <Text color="white" fw={"bold"}>
               Katalog
              </Text>
              <Group spacing={"sm"}>
                <ActionIcon variant="transparent" onClick={() => router.push("/dev/katalog/portofolio/create")}>
                  <IconPencilPlus />
                </ActionIcon>
                {/* <Logout /> */}
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
