"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import React from "react";
import ComponentColab_HeaderTamplate from "../component/header_tamplate";

export default function LayoutColab_Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentColab_HeaderTamplate title="Tambah Proyek" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
