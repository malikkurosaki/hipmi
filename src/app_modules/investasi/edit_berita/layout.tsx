"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell, Button, Center, Footer } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-simple-toasts";

export default function LayoutEditBeritaInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  return (
    <>
      <AppShell
        header={<HeaderTamplate title="Edit Berita" />}
        // footer={
        //   <Footer height={70} sx={{ borderStyle: "none" }}>
           
        //   </Footer>
        // }
      >
        {children}
      </AppShell>
    </>
  );
}
