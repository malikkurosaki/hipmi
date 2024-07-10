"use client";

import { AppShell, Center } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutJob_NonUserView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Job Vacancy" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
