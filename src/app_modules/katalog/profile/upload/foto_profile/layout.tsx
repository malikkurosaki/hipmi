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
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function UploadFotoProfileLayout({
  children,
  profileId,
}: {
  children: any;
  profileId: any;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(profileId);

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentKatalog_HeaderTamplate title="Update Foto" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
