"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutEditDokumenInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string 
}) {
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate
            title="Edit Dokumen"
            icon={<IconEdit />}
            route2={RouterInvestasi.upload_dokumen + `${idInves}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
