"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import { IconEdit } from "@tabler/icons-react";

export default function LayoutJob_DetailReject({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate
        header={<ComponentGlobal_UI_HeaderTamplate title="Detail Reject" />}
      >
        {children}
      </ComponentGlobal_UI_LayoutTamplate>
    </>
  );
}
