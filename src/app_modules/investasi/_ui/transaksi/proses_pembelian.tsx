"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentInvestasi_BoxPembelian } from "../../_component";


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
        <ComponentInvestasi_BoxPembelian dataInvestasi={dataInvestasi} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
