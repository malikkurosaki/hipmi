"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentEvent_HeaderTamplate from "../component/header_tamplate";

export default function LayoutEvent_Edit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentEvent_HeaderTamplate title="Edit Event" />}>
        {children}
      </AppShell>
    </>
  );
}
