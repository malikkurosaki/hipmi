"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit, IconMessageShare } from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default  function LayoutDetailRejectDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Detail Reject"  />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
