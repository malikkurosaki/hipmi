"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentEvent_HeaderTamplate from "../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutEvent_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentEvent_HeaderTamplate title="Tambah Event" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
