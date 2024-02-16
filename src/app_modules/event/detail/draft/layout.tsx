"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentEvent_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";

export default function LayoutEvent_DetailDraft({
  children,
  eventId
}: {
  children: React.ReactNode;
  eventId: string
}) {
  return (
    <>
      <AppShell
        header={<ComponentEvent_HeaderTamplate title="Detail Draft" icon={<IconEdit/>} route2={RouterEvent.edit + eventId}/>}
      >
        {children}
      </AppShell>
    </>
  );
}
