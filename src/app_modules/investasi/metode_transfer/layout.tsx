"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutMetodeTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentGlobal_HeaderTamplate title="Pilih Metode Transfer" />}>
        {children}
      </AppShell>
    </>
  );
}
