"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutJob_DetailDraft({
  children,
  jobId,
}: {
  children: React.ReactNode;
  jobId: string
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentJob_HeaderTamplate
            title="Detail Draft"
            icon={<IconEdit />}
            route2={RouterJob.edit + jobId}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
