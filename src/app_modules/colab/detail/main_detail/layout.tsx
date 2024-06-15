"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutColab_MainDetail({
  children,
  colabId,
  isAuthor,
}: {
  children: React.ReactNode;
  colabId: string;
  isAuthor: boolean;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentColab_HeaderTamplate
            title="Detail"
            icon={isAuthor ? <IconEdit /> : ""}
            route2={isAuthor ? RouterColab.edit + colabId : ""}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
