"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentColab_HeaderTamplate from "../component/header_tamplate";

export default function LayoutColab_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentColab_HeaderTamplate title="Tambah Proyek" />}
      >
        {children}
      </AppShell>
    </>
  );
}
