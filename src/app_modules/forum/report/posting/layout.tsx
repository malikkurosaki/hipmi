"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../../component/header/header_tamplate";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import router from "next/router";
import ComponentForum_HeaderRataKiri from "../../component/header/header_rata_kiri";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutForum_ReportPosting({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentForum_HeaderRataKiri title="Mengumpulkan Informasi Posting" />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
