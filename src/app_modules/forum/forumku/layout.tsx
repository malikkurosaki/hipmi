"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { IconX } from "@tabler/icons-react";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutForum_Forumku({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title={`${username}`}
            iconLeft={<IconX />}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentForum_HeaderTamplate
            title={`${username}`}
            changeIconBack={<IconX />}
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
