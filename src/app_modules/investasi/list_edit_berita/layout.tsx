"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import React from "react";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutListEditBeritaInvestasi({
  children,
  idInves
}: {
  children: React.ReactNode;
  idInves: string
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate
            title="List Berita"
            icon={<IconPencilPlus />}
            route2={RouterInvestasi.create_berita + `${idInves}`}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
