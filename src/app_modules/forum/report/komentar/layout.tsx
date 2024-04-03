"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../../component/header/header_tamplate";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import router from "next/router";
import ComponentForum_HeaderRataKiri from "../../component/header/header_rata_kiri";

export default function LayoutForum_ReportKomentar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentForum_HeaderRataKiri title="Mengumpulkan Informasi Komentar"/>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
