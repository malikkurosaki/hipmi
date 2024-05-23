"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutDonasi_CreateKabar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Buat Kabar" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
