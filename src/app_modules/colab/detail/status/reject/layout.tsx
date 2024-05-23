"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutColab_DetailStatusReject({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentColab_HeaderTamplate
            title="Detail Reject"
            icon={<IconEdit />}
            route2={RouterColab.edit + 1}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
