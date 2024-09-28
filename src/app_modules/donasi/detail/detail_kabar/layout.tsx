"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
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
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentDonasi_HeaderTamplate title="Detail Kabar" hideBack={true} />}
        footer={<FooterDonasi />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
