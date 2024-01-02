"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AppShell, CloseButton, Group, Header, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investasiFooter } from "../../g_state";

export default function LayoutCountDownTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investasiFooter)
  return (
    <>
      <AppShell
        header={
          <Header height={50} sx={{ borderStyle: "none" }} px={"md"}>
            <Group h={50} align="center">
              <CloseButton
                size={"md"}
                onClick={() => {
                  router.push(RouterInvestasi.main_transaksi),
                  setHotMenu(3)
                }}
              />
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
