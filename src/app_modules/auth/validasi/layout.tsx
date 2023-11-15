"use client";

import { ActionIcon, AppShell, Group, Header } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutValidasi({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter()
  return (
    <>
      <AppShell
        header={
          <Header height={50} sx={{borderStyle: "none"}} px={"md"}>
           <Group h={50} align="center">
           <ActionIcon variant="transparent" onClick={() => router.back()} >
              <IconChevronLeft />
            </ActionIcon>
           </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
