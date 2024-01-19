"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutMasukanDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentDonasi_HeaderTamplate title="Masukan Nominal Donasi" />}
      >
        {children}
      </AppShell>
    </>
  );
}
