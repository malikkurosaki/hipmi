"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default function LayoutColab_MainDetail({
  children,
  colabId,
}: {
  children: React.ReactNode;
  colabId: string;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentColab_HeaderTamplate
            title="Detail"
            icon={<IconEdit />}
            route2={RouterColab.edit + colabId}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
