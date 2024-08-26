"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investas_menu } from "../../g_state";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { Investasi_ComponentFooterMain } from "../../_component";

export function Investasi_UiLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            routerLeft={RouterCrowd.main}
            title="Investasi"
          />
        }
        footer={<Investasi_ComponentFooterMain />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
