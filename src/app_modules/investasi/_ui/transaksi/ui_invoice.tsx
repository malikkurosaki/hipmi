"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewInvoice } from "../../_view";

export function Investasi_UiInvoice() {
  return (
    <UIGlobal_LayoutTamplate
      header={<UIGlobal_LayoutHeaderTamplate title="Invoice" />}
    >
      <Investasi_ViewInvoice dataInvoice={{}} />
    </UIGlobal_LayoutTamplate>
  );
}
