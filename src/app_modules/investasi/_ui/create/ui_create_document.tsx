"use client"

import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui"
import { Investasi_ViewCreateDocument } from "../../_view";

export function Investasi_UiCreateDocument({ investasiId }: { investasiId : string}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Dokumen" />}
      >
        <Investasi_ViewCreateDocument investasiId={investasiId}/>
      </UIGlobal_LayoutTamplate>
    </>
  );
}