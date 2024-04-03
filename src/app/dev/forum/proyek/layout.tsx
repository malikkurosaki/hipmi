import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentColab_HeaderTamplate title="Partisipasi Proyek" />}
      >
        {children}
      </AppShell>
    </>
  );
}
