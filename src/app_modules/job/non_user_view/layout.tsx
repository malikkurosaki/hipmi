"use client";

import { AppShell, Center } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutJob_NonUserView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate
        header={<ComponentGlobal_UI_HeaderTamplate title="Job Vacancy" />}
      >
        {children}
      </ComponentGlobal_UI_LayoutTamplate>
    </>
  );
}
