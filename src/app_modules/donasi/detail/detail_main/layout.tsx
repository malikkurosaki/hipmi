"use client";

import { AppShell, Box, Button, Center, Footer } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import ButtonDonasi from "../../component/footer_button_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutDetailMainDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentDonasi_HeaderTamplate title="Detail Donasi" />}
        footer={<ButtonDonasi donasiId={donasiId} />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
