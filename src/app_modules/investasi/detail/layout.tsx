"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import React from "react";

export default function LayoutDetailInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon variant="transparent" onClick={() => {
                router.back()
              }}>
                <IconArrowLeft />
              </ActionIcon>
              <Text>Detail Investasi</Text>
              <ActionIcon variant="transparent" disabled onClick={() => {
                router.replace("")
              }}>
                {/* <IconEdit /> */}
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
