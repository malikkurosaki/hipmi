"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../component/header_tamplate";

export default function LayoutDonasi_CreateKabar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplateDonasi title="Buat Kabar" />}>
        {children}
      </AppShell>
    </>
  );
}
