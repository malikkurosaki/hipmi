"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
import { MODEL_Investasi } from "../model/model_investasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutEditProspektusInvestasi({
  children,
  dataInvestasi,
}: {
  children: React.ReactNode;
  dataInvestasi: MODEL_Investasi;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate
            title="Edit Prospektus"
            icon={<IconEdit />}
            route2={RouterInvestasi.upload_prospektus + `${dataInvestasi.id}`}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
