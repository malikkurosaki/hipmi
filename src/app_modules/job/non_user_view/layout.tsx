"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../component/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutJob_NonUserView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentJob_HeaderTamplate
            hideBack={true}
            title="JOB VACANCY HIMPI BADUNG"
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
