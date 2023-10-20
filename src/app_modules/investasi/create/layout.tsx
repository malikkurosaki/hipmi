"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function InvestasiCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate route="/dev/investasi/main" title="Investasi Baru" />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
