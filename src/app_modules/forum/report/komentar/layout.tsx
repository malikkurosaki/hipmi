"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import React from "react";
import ComponentForum_HeaderRataKiri from "../../component/header/header_rata_kiri";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutForum_ReportKomentar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate
        header={
          <ComponentGlobal_UI_HeaderTamplate title="Mengumpulkan Informasi Komentar" />
        }
      >
        {children}
      </ComponentGlobal_UI_LayoutTamplate>
      {/* <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentForum_HeaderRataKiri title="Mengumpulkan Informasi Komentar"/>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
