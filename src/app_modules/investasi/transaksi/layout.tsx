"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell, Title } from "@mantine/core";
import React from "react";

export default function LayoutTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<Title order={6}>History transaksi</Title>}>
        {children}
      </AppShell>
    </>
  );
}
