"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  CloseButton,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investasiFooter } from "../g_state";

export default function LayoutTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investasiFooter);

  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group position="apart" h={50} px={"md"}>
              <CloseButton
                size={"md"}
                onClick={() => {
                  router.push(RouterInvestasi.main_transaksi), setHotMenu(3);
                }}
              />
              <Text>Transfer</Text>
              <ActionIcon variant="transparent" disabled></ActionIcon>
            </Group>
          </Header>
        }
        // footer={
        //   <Footer height={70} sx={{ borderStyle: "none" }}>
            
        //   </Footer>
        // }
      >
        {children}
      </AppShell>
    </>
  );
}
