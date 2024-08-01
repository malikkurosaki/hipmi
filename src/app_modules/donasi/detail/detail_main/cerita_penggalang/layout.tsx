"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import ButtonDonasi from "@/app_modules/donasi/component/footer_button_donasi";
import ComponentDonasi_HeaderTamplate from "@/app_modules/donasi/component/header_tamplate";
import React from "react";

export default function LayoutCeritaPenggalangDonasi({
  children,
  statusDonasiId,
  donasiId,
}: {
  children: React.ReactNode;
  statusDonasiId: string;
  donasiId: string;
}) {
  if (statusDonasiId !== "1") {
    return (
      <>
        <UIGlobal_LayoutTamplate
          header={
            <UIGlobal_LayoutHeaderTamplate title="Cerita Penggalang Dana" />
          }
        >
          {children}
        </UIGlobal_LayoutTamplate>
      </>
    );
  }
  return (
    <UIGlobal_LayoutTamplate
      header={<UIGlobal_LayoutHeaderTamplate title="Cerita Penggalang Dana" />}
      footer={<ButtonDonasi donasiId={donasiId} />}
    >
      {children}
    </UIGlobal_LayoutTamplate>
  );
}
