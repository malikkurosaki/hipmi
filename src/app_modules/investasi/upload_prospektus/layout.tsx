"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutUploadProspektusInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Upload Prospektus" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
