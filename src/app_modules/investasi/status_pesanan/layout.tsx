"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import router from "next/router";
import { title } from "process";
import React from "react";

export default function LayoutStatusPesananInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group h={50} position="center" px={"md"}>
              <Text>Status Transaksi</Text>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
