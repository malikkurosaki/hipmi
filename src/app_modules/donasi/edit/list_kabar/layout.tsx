"use client";

import HeaderTamplateDonasi from "@/app_modules/donasi/component/header_tamplate";
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
      header={<HeaderTamplateDonasi title="List Kabar" />}>
        {children}
      </AppShell>
    </>
  );
}
