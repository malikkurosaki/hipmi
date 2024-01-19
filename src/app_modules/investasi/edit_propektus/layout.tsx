"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
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
      <AppShell
        header={
          <ComponentGlobal_HeaderTamplate
            title="Edit Prospektus"
            icon={<IconEdit />}
            route2={RouterInvestasi.upload_prospektus + `${dataInvestasi.id}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
