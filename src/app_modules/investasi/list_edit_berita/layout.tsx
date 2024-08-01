"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import React from "react";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export default function LayoutListEditBeritaInvestasi({
  children,
  idInves
}: {
  children: React.ReactNode;
  idInves: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="List Berita"
            iconRight={<IconPencilPlus />}
            routerRight={RouterInvestasi.create_berita + `${idInves}`}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
