"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function Admin_LayoutBuktiTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentGlobal_HeaderTamplate title="Bukti Transfer" />}>
        {children}
      </AppShell>
    </>
  );
}
