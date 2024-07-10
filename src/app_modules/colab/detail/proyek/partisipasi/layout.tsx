"use client";

import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutColab_DetailPartisipasiProyek({
  children,
}: {
  children: any;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentColab_HeaderTamplate title="Detail Partisipan" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
