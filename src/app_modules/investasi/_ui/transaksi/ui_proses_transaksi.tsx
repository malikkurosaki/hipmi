"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { IconX } from "@tabler/icons-react";
import { Investasi_ViewProsesTransaksi } from "../../_view";

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
        <Investasi_ViewProsesTransaksi />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
