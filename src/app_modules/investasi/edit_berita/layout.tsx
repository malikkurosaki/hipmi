"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutEditBeritaInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentGlobal_HeaderTamplate title="Edit Berita" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
