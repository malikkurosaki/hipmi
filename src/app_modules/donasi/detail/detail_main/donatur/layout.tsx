"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../../component/header_tamplate";

export default function LayoutDonaturDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplateDonasi title="Donatur" />}>
        {children}
      </AppShell>
    </>
  );
}
