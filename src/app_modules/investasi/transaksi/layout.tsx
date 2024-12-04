"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import { Title } from "@mantine/core";
import React from "react";

export default function LayoutTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<Title order={6}>History transaksi</Title>}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
