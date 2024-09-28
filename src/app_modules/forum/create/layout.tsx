"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutForum_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <UIGlobal_LayoutTamplate
    header={<UIGlobal_LayoutHeaderTamplate title="Tambah Postingan"/>}
    >
      {children}
    </UIGlobal_LayoutTamplate>


      {/* <AppComponentGlobal_LayoutTamplate header={<ComponentForum_HeaderTamplate title="Tambah Postingan" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
