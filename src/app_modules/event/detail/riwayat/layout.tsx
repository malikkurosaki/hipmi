"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentEvent_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutEvent_DetailRiwayat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentEvent_HeaderTamplate title="Detail Riwayat" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
