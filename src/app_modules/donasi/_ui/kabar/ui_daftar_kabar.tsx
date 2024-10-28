"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import React from "react";
import { Donasi_ViewDaftarKabar } from "../../_view";

export function Donasi_UiDaftarKabar({
  dataDonasi,
  donasiId,
}: {
  dataDonasi: string;
  donasiId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Kabar" />}
      >
        <Donasi_ViewDaftarKabar
          dataDonasi={dataDonasi as any}
          donasiId={donasiId}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
