"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
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
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Status Transaksi" hideButtonLeft/>
          // <Header height={50}>
          //   <Group h={50} position="center" px={"md"}>
          //     <Text>Status Transaksi</Text>
          //   </Group>
          // </Header>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
