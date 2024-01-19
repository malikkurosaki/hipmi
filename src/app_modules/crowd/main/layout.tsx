"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutMainCrowd({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<ComponentGlobal_HeaderTamplate route="/dev/home" title="HIPMI Crowd Funding" />}
      >
        {children}
      </AppShell>
    </>
  );
}
