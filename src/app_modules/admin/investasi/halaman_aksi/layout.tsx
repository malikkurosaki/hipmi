"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
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
      <AppShell header={<HeaderTamplate title="Pilih Aksi" />}>
        {children}
      </AppShell>
    </>
  );
}
