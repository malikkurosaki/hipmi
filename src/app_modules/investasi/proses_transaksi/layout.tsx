"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { ActionIcon, AppShell, Box, Group, Header, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { gs_midtrans_snap } from "../g_state";
import { IconArrowLeft } from "@tabler/icons-react";
import { title } from "process";
import { useRouter } from "next/navigation";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";

export default function LayoutProsesTransaksiInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snapShow, setSnapShow] = useAtom(gs_midtrans_snap);
  const router = useRouter();
  // console.log(snapShow)
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconArrowLeft />
              </ActionIcon>
              <Text fw={500}>Proses Transaksi</Text>
              <ActionIcon variant="transparent" disabled></ActionIcon>
            </Group>
          </Header>
        }
      >
        <Box>{children}</Box>
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
