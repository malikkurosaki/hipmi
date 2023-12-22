"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../component/header_tamplate";
import { IconEdit, IconMessageShare } from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export default  function LayoutDetailPublishDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={<HeaderTamplateDonasi title="Detail Publish" icon={<IconMessageShare/>} route2={RouterDonasi.list_kabar} />}>
        {children}
      </AppShell>
    </>
  );
}
