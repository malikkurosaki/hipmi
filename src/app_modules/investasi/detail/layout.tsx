"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconChevronLeft, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import React from "react";

export default function LayoutDetailInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} style={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Detail Investasi</Title>
              <ActionIcon
                variant="transparent"
                disabled
                onClick={() => {
                  router.replace("");
                }}
              >
                {/* <IconEdit /> */}
              </ActionIcon>
            </Group>
          </Header>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
