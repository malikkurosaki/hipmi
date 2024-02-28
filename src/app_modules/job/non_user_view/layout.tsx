"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../component/header_tamplate";

export default function LayoutJob_NonUserView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentJob_HeaderTamplate
            hideBack={true}
            title="JOB VACANCY HIMPI BADUNG"
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
