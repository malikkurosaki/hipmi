"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Drawer,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import ComponentJob_HeaderTamplate from "../../component/header_tamplate";
import { IconDots, IconDotsVertical, IconEdit, IconX } from "@tabler/icons-react";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";

export default function LayoutJob_DetailDraft({
  children,
  jobId,
}: {
  children: React.ReactNode;
  jobId: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();

  const listComponent = [
    {
      id: "1",
      name: "Edit Job",
      icon: <IconEdit />,
      path: RouterJob.edit + jobId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            iconRight={
              <ActionIcon variant="transparent" onClick={() => open()}>
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
            // routerRight={}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={opened}
        close={close}
        component={listComponent}
      />
    </>
  );
}
