"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutPenggalangDanaDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Informasi Penggalangan Dana" />
        }
        //   footer={<FooterDonasi />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
