"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { ActionIcon, AppShell, Box, Group, Header, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { gs_midtrans_snap } from "../g_state";
import { IconArrowLeft } from "@tabler/icons-react";
import { title } from "process";
import { useRouter } from "next/navigation";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutProsesTransaksiInvestasi({
  children,
  investasiId,
}: {
  children: React.ReactNode;
  investasiId: string;
}) {
  const [snapShow, setSnapShow] = useAtom(gs_midtrans_snap);
  const router = useRouter();
  // console.log(snapShow)
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Proses Transaksi" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
