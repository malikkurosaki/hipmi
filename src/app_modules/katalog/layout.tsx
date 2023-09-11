"use client";

import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Header,
  Title,
} from "@mantine/core";

import {
  IconArrowLeft,
  IconChevronLeft,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Logout } from "../auth";

export default function KatalogLayout({ children }: { children: any }) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <Header height={50} px={"sm"} bg={"dark"}>
            <Group position="apart" align="center" h={50}>
              <ActionIcon variant="transparent" onClick={() => router.push("/dev/home")} >
                <IconChevronLeft size={20} />
              </ActionIcon>
              <Title color="white" order={4}>Katalog</Title>
              
             <Group spacing={1}>
              <Logout/>
             <ActionIcon>
                <IconPencilPlus />
              </ActionIcon>
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
