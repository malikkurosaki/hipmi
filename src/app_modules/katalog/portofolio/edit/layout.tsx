"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentKatalog_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutPortofolio_EditBisnis({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentKatalog_HeaderTamplate title="Edit Portofolio" />}
      >
        {children}
      </AppShell>
    </>
  );
}
