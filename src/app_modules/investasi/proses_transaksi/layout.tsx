"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { ActionIcon, AppShell, Box, Group, Header, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { gs_midtrans_snap } from "../g_state";
import { IconArrowLeft } from "@tabler/icons-react";
import { title } from "process";
import { useRouter } from "next/navigation";

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
      <AppShell
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
      </AppShell>
    </>
  );
}
