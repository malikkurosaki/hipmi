"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutJob_DetailArsip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentJob_HeaderTamplate title="Detail Arsip" />}>
        {children}
      </AppShell>
    </>
  );
}
