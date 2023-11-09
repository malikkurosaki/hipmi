"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell, Stack, Text } from "@mantine/core";
import React from "react";

export default function LayoutEditIntroInvestasi({

  children,
}: {

  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplate title="Edit Intro" />}>
        <Stack>
          {children}
        </Stack>
      </AppShell>
    </>
  );
}
