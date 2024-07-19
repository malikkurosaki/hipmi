"use client";

import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutColab_DetailPartisipasiProyek({
  children,
}: {
  children: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Partisipan" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
