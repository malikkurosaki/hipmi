"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewDaftarDokumen } from "../../_view";

export function Investasi_UiDaftarDokmen({
  dataDokumen,
  investasiId,
}: {
  dataDokumen: any[];
  investasiId: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Dokumen" />}
      >
        <Investasi_ViewDaftarDokumen
          dataDokumen={dataDokumen}
          investasiId={investasiId}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
