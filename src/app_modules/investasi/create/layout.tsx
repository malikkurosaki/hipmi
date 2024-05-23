"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function InvestasiCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate  title="Investasi Baru" />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
