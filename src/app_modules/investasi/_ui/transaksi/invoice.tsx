"use client";

import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentInvestasi_ViewInvoice } from "../../_component";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export function Investasi_UiInvoice() {
  return (
    <UIGlobal_LayoutTamplate
      header={<UIGlobal_LayoutHeaderTamplate title="Invoice" />}
    >
      <ComponentInvestasi_ViewInvoice dataInvoice={{}} />
    </UIGlobal_LayoutTamplate>
  );
}
