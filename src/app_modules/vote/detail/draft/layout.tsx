"use client";

import { ActionIcon, AppShell } from "@mantine/core";
import React, { useState } from "react";
import ComponentVote_HeaderTamplate from "../../component/header_tamplate";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";

export default function LayoutVote_DetailDraft({
  children,
  voteId,
}: {
  children: React.ReactNode;
  voteId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listComponent = [
    {
      id: "1",
      name: "Edit Voting",
      icon: <IconEdit />,
      path: RouterVote.edit + voteId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listComponent}
      />
    </>
  );
}
