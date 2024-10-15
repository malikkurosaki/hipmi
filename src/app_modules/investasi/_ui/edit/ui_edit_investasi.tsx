"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewEditInvestasi } from "../../_view";

export function Investasi_UiEditInvestasi({
  dataInvestasi,
  pembagianDeviden,
  pencarianInvestor,
  periodeDeviden,
}: {
  dataInvestasi: any;
  pembagianDeviden: any[];
  pencarianInvestor: any[];
  periodeDeviden: any[];
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Investasi" />}
      >
        <Investasi_ViewEditInvestasi
          dataInvestasi={dataInvestasi}
          pembagianDeviden={pembagianDeviden}
          pencarianInvestor={pencarianInvestor}
          periodeDeviden={periodeDeviden}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
