"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentVote_HeaderTamplate from "../../component/header_tamplate";
import { IconEdit } from "@tabler/icons-react";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";

export default function LayoutVote_DetailDraft({
  children,
  voteId
}: {
  children: React.ReactNode;
  voteId: string
}) {
  return (
    <>
      <AppShell
        header={
          <ComponentVote_HeaderTamplate
            title="Detail Draft"
            icon={<IconEdit />}
            route2={RouterVote.edit + voteId}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
