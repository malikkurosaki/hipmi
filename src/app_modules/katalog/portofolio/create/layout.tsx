"use client";

import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentKatalog_HeaderTamplate from "../../component/header_tamplate";

export default function CreatePortofolioLayout({ children, profileId }: { children: any, profileId: any }) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <ComponentKatalog_HeaderTamplate title="Buat Portofolio"/>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
