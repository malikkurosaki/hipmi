"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit, IconMessageShare } from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default  function LayoutDetailReviewDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentDonasi_HeaderTamplate title="Detail Review"  />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
