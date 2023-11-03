"use client"

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import { AppShell, Header, Group, CloseButton, ActionIcon, Footer, Center, Button, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_investasiFooter } from "../../g_state";

export default function LayoutStatusTransaksiInvestasi_Gagal( {
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
                    router.push(RouterInvestasi.main_transaksi), setHotMenu(3);
                  }}
                >
                  Kembali Ke Transaksi
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