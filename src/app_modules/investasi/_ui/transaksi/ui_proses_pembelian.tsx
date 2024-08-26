"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewProsesPembelian } from "../../_view";

export function Investasi_UiProsesPembelian({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Pembelian Saham" />}
      >
        <Investasi_ViewProsesPembelian dataInvestasi={dataInvestasi} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
