"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AppShell, CloseButton, Group, Header, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutCountDownTransaksiInvestasi({
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
              <CloseButton size={"md"} onClick={() => router.push(RouterInvestasi.portofolio)}  />
              <Text>Status Transfer</Text>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
