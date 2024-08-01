"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";
import { MODEL_Investasi } from "../model/model_investasi";

export default function LayoutEditProspektusInvestasi({
  children,
  dataInvestasi,
}: {
  children: React.ReactNode;
  dataInvestasi: MODEL_Investasi;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Edit Prospektus"
            // icon={<IconEdit />}
            // route2={RouterInvestasi.upload_prospektus + `${dataInvestasi.id}`}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
