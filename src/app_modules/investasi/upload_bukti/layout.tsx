"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutBuktiTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplate title="Upload Bukti Transfer" />}>
        {children}
      </AppShell>
    </>
  );
}
