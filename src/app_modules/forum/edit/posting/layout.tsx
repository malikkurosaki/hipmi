"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutForum_EditPosting({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Postingan" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={<ComponentForum_HeaderTamplate title="Edit Postingan" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
