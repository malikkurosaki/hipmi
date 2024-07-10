"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutJob_DetailReview({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Review" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
