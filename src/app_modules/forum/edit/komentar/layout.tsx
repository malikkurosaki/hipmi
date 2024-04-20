"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../../component/header/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutForum_EditKomentar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentForum_HeaderTamplate title="Edit Komentar" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
