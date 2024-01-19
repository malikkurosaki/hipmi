"use client";

import ButtonDonasi from "@/app_modules/donasi/component/footer_button_donasi";
import FooterDonasi from "@/app_modules/donasi/component/footer_close_donasi";
import ComponentDonasi_HeaderTamplate from "@/app_modules/donasi/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutCeritaPenggalangDonasi({
  children,
  statusDonasiId,
  donasiId
}: {
  children: React.ReactNode;
  statusDonasiId: string;
  donasiId: string
}) {
  if (statusDonasiId !== "1") {
    return (
      <>
        <AppShell
          header={<ComponentDonasi_HeaderTamplate title="Cerita Penggalang Dana" />}
        >
          {children}
        </AppShell>
      </>
    );
  }
  return (
    <AppShell
      header={<ComponentDonasi_HeaderTamplate title="Cerita Penggalang Dana" />}
      footer={<ButtonDonasi donasiId={donasiId}/>}
    >
      {children}
    </AppShell>
  );
}
