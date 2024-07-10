"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentDonasi_HeaderTamplate from "@/app_modules/donasi/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutPenggalangDanaDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentDonasi_HeaderTamplate title="Informasi Penggalangan Dana" />}
        //   footer={<FooterDonasi />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
