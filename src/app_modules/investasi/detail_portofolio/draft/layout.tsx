"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutDetailDraftInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate
            title="Detail Draft"
            icon={<IconEdit />}
            route2={`/dev/investasi/edit/${1}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
