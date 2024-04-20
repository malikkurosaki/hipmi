"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentVote_HeaderTamplate from "../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutVote_Edit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate header={<ComponentVote_HeaderTamplate title="Edit Vote" />}>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
