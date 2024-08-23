"use client";

import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentInvestasi_ProsesAccAdmin } from "../../_component";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { IconX } from "@tabler/icons-react";

export function Investasi_UiProsesTransaksi() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Proses Transaksi"
            iconLeft={<IconX />}
          />
        }
      >
        <ComponentInvestasi_ProsesAccAdmin />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
