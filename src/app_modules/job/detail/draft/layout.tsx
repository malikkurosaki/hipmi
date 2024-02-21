"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export default function LayoutJob_DetailDraft({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentJob_HeaderTamplate
            title="Detail Draft"
            icon={<IconEdit />}
            route2={RouterJob.edit}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
