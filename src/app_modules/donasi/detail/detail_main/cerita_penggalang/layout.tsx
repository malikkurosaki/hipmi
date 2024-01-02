"use client";

import ButtonDonasi from "@/app_modules/donasi/component/footer_button_donasi";
import FooterDonasi from "@/app_modules/donasi/component/footer_close_donasi";
import HeaderTamplateDonasi from "@/app_modules/donasi/component/header_tamplate";
import { AppShell } from "@mantine/core";
import React from "react";

export default function LayoutCeritaPenggalangDonasi({
  children,
  statusDonasiId,
}: {
  children: React.ReactNode;
  statusDonasiId: string;
}) {
  if (statusDonasiId !== "1") {
    return (
      <>
        <AppShell
          header={<HeaderTamplateDonasi title="Cerita Penggalang Dana" />}
        >
          {children}
        </AppShell>
      </>
    );
  }
  return (
    <AppShell
      header={<HeaderTamplateDonasi title="Cerita Penggalang Dana" />}
      footer={<ButtonDonasi />}
    >
      {children}
    </AppShell>
  );
}
