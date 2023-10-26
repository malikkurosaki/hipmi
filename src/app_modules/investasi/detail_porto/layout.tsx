"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { title } from "process";
import React from "react";

export default function LayoutPortofolioDetailInvestasi({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <HeaderTamplate
            title="Portofolio Investasi"
            icon={<IconEdit />}
            route2={`/dev/investasi/edit/${id}`}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
