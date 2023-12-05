"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutDetailRejecttInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string;
}) {
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate
            title="Detail Reject"
            // icon={<IconEdit />}
            // route2={`/dev/investasi/edit/${idInves}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
