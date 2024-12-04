"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewEditProspektus } from "../../_view";

export function Investasi_UiEditProspektus({
  investasiId,
}: {
  investasiId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Prospektus" />}
      >
        <Investasi_ViewEditProspektus investasiId={investasiId} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
