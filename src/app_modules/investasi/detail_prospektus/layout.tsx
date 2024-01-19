"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { title } from "process";
import React from "react";

export default function LayoutDetailProspektus({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell header={<ComponentGlobal_HeaderTamplate title="Prospektus" />}>
        {children}
      </AppShell>
    </>
  );
}
