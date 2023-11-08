"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutEditProspektusInvestasi({
  children,
  idInves
}: {
  children: React.ReactNode;
  idInves: string
}) {
  return (
    <>
      <AppShell header={<HeaderTamplate title="Edit Prospektus" icon={<IconEdit/>}route2={RouterInvestasi.upload_prospektus + `${idInves}`} />}>
        {children}
      </AppShell>
    </>
  );
}
