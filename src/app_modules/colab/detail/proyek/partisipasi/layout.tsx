"use client";

import ComponentColab_HeaderTamplate from "@/app_modules/colab/component/header_tamplate";
import { AppShell } from "@mantine/core";

export default function LayoutColab_DetailPartisipasiProyek({
  children,
}: {
  children: any;
}) {
  return (
    <>
      <AppShell header={<ComponentColab_HeaderTamplate title="Detail Partisipan"/>}>{children}</AppShell>
    </>
  );
}
