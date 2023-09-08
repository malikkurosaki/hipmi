"use client";

import { ActionIcon, AppShell, Button, Group, Header, Title } from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation";

export default function KatalogLayout({ children }: { children: any }) {
    const router = useRouter()
  return (
    <>
      <AppShell
        header={
          <Header height={50} px={"sm"}>
            <Group position="apart" align="center" h={50}>
              <ActionIcon onClick={() => router.push("/dev/home")}>
                <IconArrowLeft size={15}/>
              </ActionIcon>
              <Title order={4}>Katalog</Title>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
