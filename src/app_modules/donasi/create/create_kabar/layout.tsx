"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutDonasi_CreateKabar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate header={<UIGlobal_LayoutHeaderTamplate title="Tambah Kabar" />}>
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
