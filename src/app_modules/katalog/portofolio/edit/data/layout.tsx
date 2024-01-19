"use client";

import ComponentKatalog_HeaderTamplate from "@/app_modules/katalog/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";


export default function LayoutPortofolio_EditDataBisnis({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentKatalog_HeaderTamplate title="Edit Data Bisnis" />}
      >
        {children}
      </AppShell>
    </>
  );
}
