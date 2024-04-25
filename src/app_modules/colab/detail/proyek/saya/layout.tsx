"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutColab_DetailProyekSaya({
  children,
  dataColab,
}: {
  children: React.ReactNode;
  dataColab: MODEL_COLLABORATION;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentColab_HeaderTamplate
            title="Proyek Saya"
            icon={<IconEdit />}
            route2={RouterColab.edit + dataColab?.id}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
