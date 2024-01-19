"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell, Stack, Text } from "@mantine/core";
import React from "react";

export default function LayoutEditIntroInvestasi({

  children,
}: {

  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<ComponentGlobal_HeaderTamplate title="Edit Intro" />}>
        <Stack>
          {children}
        </Stack>
      </AppShell>
    </>
  );
}
