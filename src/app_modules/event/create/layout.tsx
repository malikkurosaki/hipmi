"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentEvent_HeaderTamplate from "../component/header_tamplate";

export default function LayoutEvent_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentEvent_HeaderTamplate title="Tambah Event" />}>
        {children}
      </AppShell>
    </>
  );
}
