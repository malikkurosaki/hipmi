"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { useAtom } from "jotai";
import { gs_donasi_hot_menu } from "../../global_state";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutDonasi_ProsesTransaksi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);
  async function onClick() {
    setDonasiHotMenu(2);
    router.push(RouterDonasi.main_donasi_saya);
  }
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Proses Transaksi"
            customButtonLeft={
              <ActionIcon variant="transparent" onClick={() => onClick()}>
                <IconX />
              </ActionIcon>
            }
          />

          // <Header height={50} sx={{ borderStyle: "none" }}>
          //   <Group h={50} position="apart" px={"md"}>
          //     <ActionIcon variant="transparent" onClick={() => onClick()}>
          //       <IconX />
          //     </ActionIcon>
          //     <Title order={5}>Proses Transaksi</Title>
          //     <ActionIcon disabled variant="transparent"></ActionIcon>
          //   </Group>
          // </Header>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
