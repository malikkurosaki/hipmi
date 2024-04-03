"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";

export default function LayoutForum_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentForum_HeaderTamplate title="Tambah Postingan" />}>
        {children}
      </AppShell>
    </>
  );
}
