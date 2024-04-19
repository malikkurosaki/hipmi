"use client";

import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentKatalog_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function CreatePortofolioLayout({ children, profileId }: { children: any, profileId: any }) {
  const router = useRouter();
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentKatalog_HeaderTamplate title="Buat Portofolio"/>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
