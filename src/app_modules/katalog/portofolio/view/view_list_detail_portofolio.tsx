import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import React from "react";
import { Portofolio_UiListDetail } from "../ui/ui_list_detail_portofolio";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import { MODEL_PORTOFOLIO } from "../model/interface";

export async function Portofolio_ViewListDetail({
  dataPortofolio,
  profileId
}: {
  dataPortofolio: MODEL_PORTOFOLIO[]
  profileId: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Portofolio" />}
      >
        <Portofolio_UiListDetail dataPortofolio={dataPortofolio} profileId={profileId} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
