"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutDetailRejecttInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Reject"
            // icon={<IconEdit />}
            // route2={`/dev/investasi/edit/${idInves}`}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
