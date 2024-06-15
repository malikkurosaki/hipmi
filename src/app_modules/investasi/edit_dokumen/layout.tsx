"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutEditDokumenInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string 
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate
            title="Edit Dokumen"
            icon={<IconEdit />}
            route2={RouterInvestasi.upload_dokumen + `${idInves}`}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
