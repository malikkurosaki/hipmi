"use client";

import { AppShell } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { IconX } from "@tabler/icons-react";

export default function LayoutForum_Forumku({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  return (
    <>
      <AppShell
        header={<ComponentForum_HeaderTamplate title={`${username}`} changeIconBack={<IconX/>}/>}
      >
        {children}
      </AppShell>
    </>
  );
}