"use client";

import ComponentDonasi_HeaderTamplate from "@/app_modules/donasi/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutListKabarDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell 
      header={<ComponentDonasi_HeaderTamplate title="List Kabar" />}>
        {children}
      </AppShell>
    </>
  );
}
