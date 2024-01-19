"use client";

import {
  AppShell,
  Button,
  Center,
  Divider,
  Footer,
  Header,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import FooterDonasi from "../../component/footer_close_donasi";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";

export default function LayoutDetailKabarDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<ComponentDonasi_HeaderTamplate title="Detail Kabar" hideBack={true} />}
        footer={<FooterDonasi />}
      >
        {children}
      </AppShell>
    </>
  );
}
