"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewMetodePembayaran } from "../../_view";

export function Investasi_UiMetodePembayaran({
  listBank,
  investasiId,
}: {
  listBank: any[];
  investasiId: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Metode Pembayaran" />}
      >
        <Investasi_ViewMetodePembayaran
          listBank={listBank}
          investasiId={investasiId}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
