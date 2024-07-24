"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";
import ButtonDonasi from "../../component/footer_button_donasi";

export default function LayoutDetailMainDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Donasi" />}
        footer={<ButtonDonasi donasiId={donasiId} />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
