"use client";

import {
  ActionIcon,
  AppShell,
  FileButton,
  Flex,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentKatalog_HeaderTamplate from "@/app_modules/katalog/component/header_tamplate";

export default function LayoutProfile_UpdateFotoBackground({
  children,

}: {
  children: any;

}) {
  const router = useRouter();


  return (
    <>
      <AppShell
        header={<ComponentKatalog_HeaderTamplate title="Update Background" />}
      >
        {children}
      </AppShell>
    </>
  );
}
