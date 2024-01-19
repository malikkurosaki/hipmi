"use client";

import { Warna } from "@/app/lib/warna";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { AppShell, Button, Center, Footer } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import React from "react";
import toast from "react-simple-toasts";

export default function LayoutCreateBeritaInvestasi({
  children,
  idInves
}: {
  children: React.ReactNode;
  idInves: string
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<ComponentGlobal_HeaderTamplate title="Buat Berita" />}
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
