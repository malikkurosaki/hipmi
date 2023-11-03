"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  CloseButton,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investasiFooter } from "../g_state";
import { Warna } from "@/app/lib/warna";

export default function LayoutStatusTransaksiInvestasi(
  {
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investasiFooter);

  return (
    <>
      <AppShell
        header={
          <Header height={50}>
            <Group position="apart" align="center" h={50} px={"md"}>
              <CloseButton
                size={"md"}
                onClick={() => {
                  router.push(RouterInvestasi.main_transaksi);
                  setHotMenu(3);
                }}
              />
              <Text>Status Transaksi</Text>
              <ActionIcon variant="transparent" disabled></ActionIcon>
            </Group>
          </Header>
        }
        footer={
          <Footer height={70} sx={{ borderStyle: "none" }}>
            <Center>
              <Button
                w={300}
                radius={50}
                bg={Warna.biru}
                onClick={() => {
                  router.push(RouterInvestasi.main_investasi), setHotMenu(2);
                }}
              >
                Kembali Ke Investasi
              </Button>
            </Center>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
