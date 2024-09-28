"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentVote_HeaderTamplate from "../../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutVote_DetailReview({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentVote_HeaderTamplate title="Detail Review" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
