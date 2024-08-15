"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
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
import { gs_investas_menu } from "../g_state";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
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
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
