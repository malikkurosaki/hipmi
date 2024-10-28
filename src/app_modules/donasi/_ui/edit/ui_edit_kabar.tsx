"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Donasi_ViewEditKabar } from "../../_view";

export function Donasi_UiEditKabar({ dataKabar }: { dataKabar: any }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Kabar" />}
      >
        <Donasi_ViewEditKabar dataKabar={dataKabar as any} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
