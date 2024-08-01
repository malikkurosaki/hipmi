"use client";

import { ActionIcon, AppShell } from "@mantine/core";
import React, { useState } from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import {
  IconDotsVertical,
  IconEdit,
  IconMessageShare,
} from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";

export default function LayoutDetailPublishDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Daftar Kabar",
      icon: <IconMessageShare />,
      path: RouterDonasi.list_kabar + donasiId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Publish"
            // icon={<IconMessageShare />}
            // route2={RouterDonasi.list_kabar + `${donasiId}`}
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
        component={listPage}
      />
    </>
  );
}
