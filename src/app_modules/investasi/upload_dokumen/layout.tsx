"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutUploadDokumenInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentGlobal_HeaderTamplate title="Upload Dokumen" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
