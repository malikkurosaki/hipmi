"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentInvestasi_BoxMetodePembayaran } from "../../_component";

export function Investasi_UiMetodePembayaran({ listBank }: { listBank: any[] }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Metode Pembayaran" />}
      >
        <ComponentInvestasi_BoxMetodePembayaran listBank={listBank} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
