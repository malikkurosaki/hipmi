"use client";

import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { AppShell } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutColab_DetailStatusPublish({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentColab_HeaderTamplate
            title="Proyek Saya"
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
