"use client";

import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutForum_ReportPosting({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate
        header={
          <ComponentGlobal_UI_HeaderTamplate title="Mengumpulkan Informasi Posting" />
        }
      >
        {children}
      </ComponentGlobal_UI_LayoutTamplate>

  
    </>
  );
}
