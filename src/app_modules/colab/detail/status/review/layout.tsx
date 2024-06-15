"use client";

import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutColab_DetailStatusReview({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentColab_HeaderTamplate title="Detail Review" />}
      >
        {children}
      </AppShell>
    </>
  );
}
