"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import React from "react";
import getOneInvestasiById from "../fun/get_one_investasi_by_id";

export default function LayoutListEditBeritaInvestasi({
  children,
  idInves
}: {
  children: React.ReactNode;
  idInves: string
}) {
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate
            title="List Berita"
            icon={<IconPencilPlus />}
            route2={RouterInvestasi.create_berita + `${idInves}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
