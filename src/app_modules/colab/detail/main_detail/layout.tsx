"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

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
      <AppShell
        header={
          <ComponentColab_HeaderTamplate
            title="Detail"
            icon={isAuthor ? <IconEdit /> : ""}
            route2={isAuthor ? RouterColab.edit + colabId : ""}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
