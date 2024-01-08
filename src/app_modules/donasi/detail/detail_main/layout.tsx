"use client";

import { AppShell, Box, Button, Center, Footer } from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../component/header_tamplate";
import ButtonDonasi from "../../component/footer_button_donasi";

export default function LayoutDetailMainDonasi({
  children,
  donasiId
}: {
  children: React.ReactNode;
  donasiId: string
}) {
  return (
    <>
      <AppShell
        header={<HeaderTamplateDonasi title="Detail Donasi" />}
        footer={<ButtonDonasi  donasiId={donasiId}/>}
      >
        {children}
      </AppShell>
    </>
  );
}
