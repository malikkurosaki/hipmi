"use client";

import { Warna } from "@/app/lib/warna";
import HeaderTamplate from "@/app_modules/component/header_tamplate";
import { AppShell, Button, Center, Footer } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import React from "react";
import toast from "react-simple-toasts";

export default function LayoutCreateBeritaInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<HeaderTamplate title="Buat Berita" />}
        footer={
          <Footer height={70} sx={{ borderStyle: "none" }}>
            <Center>
              <Button
                w={300}
                radius={50}
                bg={Warna.biru}
                onClick={() => {
                    router.back()
                    toast("Berita tersimpan")
                }}
              >
                Simpan
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
