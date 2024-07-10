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
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_UI_Drawer from "@/app_modules/component_global/ui/ui_drawer";

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
      <LayoutGlobal_UI_Tamplate
        header={
          <LayoutGlobal_UI_HeaderTamplate
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
      </LayoutGlobal_UI_Tamplate>

      <ComponentGlobal_UI_Drawer
        opened={opened}
        close={close}
        component={listComponent}
      />
    </>
  );
}
