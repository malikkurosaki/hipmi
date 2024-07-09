"use client";

import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutJob_Edit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Edit Job" />}
      >
        {children}
      </LayoutGlobal_UI_Tamplate>

    </>
  );
}
