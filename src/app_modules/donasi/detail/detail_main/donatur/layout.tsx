"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../../component/header_tamplate";

export default function LayoutDonaturDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Donatur" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
