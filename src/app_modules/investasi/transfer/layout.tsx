"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell, Button, Center, Footer } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investasiFooter } from "../g_state";

export default function LayoutTransferInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [changeColor, setChangeColor] = useAtom(gs_investasiFooter);

  return (
    <>
      <AppShell
        header={<HeaderTamplate title="Transfer " />}
        footer={
          <Footer height={70} sx={{ borderStyle: "none" }}>
            <Center>
              <Button
                radius={50}
                w={300}
                bg={Warna.biru}
                onClick={() => {
                  router.push(RouterInvestasi.dialog_page);
                  setChangeColor(true)
                  // router.push(RouterInvestasi.status_transaksi);
                  
                }}
              >
                Sudah Transfer
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
