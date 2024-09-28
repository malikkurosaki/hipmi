"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutEditDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Edit Donasi" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
