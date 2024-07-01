"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutForum_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ComponentGlobal_UI_LayoutTamplate
    header={<ComponentGlobal_UI_HeaderTamplate title="Tambah Postingan"/>}
    >
      {children}
    </ComponentGlobal_UI_LayoutTamplate>


      {/* <AppComponentGlobal_LayoutTamplate header={<ComponentForum_HeaderTamplate title="Tambah Postingan" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
