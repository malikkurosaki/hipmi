"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutDetailBeritaInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentGlobal_HeaderTamplate title="Detail Berita" />}>
        {children}
      </AppShell>
    </>
  );
}
