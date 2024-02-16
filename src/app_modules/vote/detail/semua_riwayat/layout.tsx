"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentVote_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutVote_DetailSemuaRiwayat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={<ComponentVote_HeaderTamplate title="Detail Riwayat" />}
      >
        {children}
      </AppShell>
    </>
  );
}
