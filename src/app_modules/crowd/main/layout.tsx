"use client";

import HeaderTamplate from "@/app_modules/component/header_tamplate";
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
        header={<HeaderTamplate route="/dev/home" title="HIPMI Crowd Funding" />}
      >
        {children}
      </AppShell>
    </>
  );
}
