"use client";

import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutForum_Komentar({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Komentar</Title>
            </Group>
          </Header>
        }
        // header={<ComponentForum_HeaderTamplate title="Komentar" />}
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
