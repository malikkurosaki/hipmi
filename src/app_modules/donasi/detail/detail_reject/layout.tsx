"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../component/header_tamplate";
import { IconEdit, IconMessageShare } from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export default  function LayoutDetailRejectDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <AppShell header={<HeaderTamplateDonasi title="Detail Reject"  />}>
        {children}
      </AppShell>
    </>
  );
}
