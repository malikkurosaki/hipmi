"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ActionIcon,
  AppShell,
  CloseButton,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investasiFooter } from "../g_state";

export default function LayoutStatusTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);

  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group position="apart" align="center" h={50} px={"md"}>
              <CloseButton
                size={"md"}
                onClick={() => {
                  router.push(RouterInvestasi.portofolio);
                  // setChangeColor(true);
                }}
              />
              <Text>Status Transaksi</Text>
              <ActionIcon variant="transparent" disabled></ActionIcon>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
