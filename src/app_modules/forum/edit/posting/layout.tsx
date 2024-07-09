"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../../component/header/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutForum_EditPosting({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Edit Postingan" />}
      >
        {children}
      </LayoutGlobal_UI_Tamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={<ComponentForum_HeaderTamplate title="Edit Postingan" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
