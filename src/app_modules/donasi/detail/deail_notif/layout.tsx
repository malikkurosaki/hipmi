"use client";

import { AppShell, Button, Center, Footer } from "@mantine/core";
import React from "react";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import { useRouter } from "next/navigation";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export default function LayoutDonasi_DetailNotif({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<ComponentDonasi_HeaderTamplate title="Detail Pemberitahuan" />}
        footer={
          <Footer height={70} p={"md"}>
            <Center h={"100%"}>
              <Button
                w={"100%"}
                radius={"xl"}
                onClick={() =>
                  router.push(RouterDonasi.detail_main + `${donasiId}`)
                }
              >
                Lihat Donasi
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
