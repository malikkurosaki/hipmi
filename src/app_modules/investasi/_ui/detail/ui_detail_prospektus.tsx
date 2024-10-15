"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewDetailProspektus } from "../../_view";

export function Investasi_UiDetailProspektus({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Prospektus" />}
      >
        <Investasi_ViewDetailProspektus dataInvestasi={dataInvestasi} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
