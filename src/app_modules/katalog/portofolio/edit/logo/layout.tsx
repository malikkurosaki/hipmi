"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentKatalog_HeaderTamplate from "@/app_modules/katalog/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutPortofolio_EditLogoBisnis({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentKatalog_HeaderTamplate title="Edit Logo Bisnis" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
