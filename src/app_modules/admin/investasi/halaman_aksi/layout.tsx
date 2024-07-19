"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function Admin_LayoutHalamanAksi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* {children} */}
      <AppShell padding={"md"} header={<ComponentGlobal_HeaderTamplate title="Pilih Aksi" />}>
        {children}
      </AppShell>
    </>
  );
}
