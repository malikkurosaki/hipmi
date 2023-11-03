"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
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
