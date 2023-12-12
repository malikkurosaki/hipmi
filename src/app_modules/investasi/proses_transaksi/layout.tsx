"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutProsesTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplate title="Proses Transaksi" />}>
        {children}
      </AppShell>
    </>
  );
}