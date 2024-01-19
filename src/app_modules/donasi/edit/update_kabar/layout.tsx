"use client";

import {
  AppShell,
  Button,
  Center,
  Divider,
  Footer,
  Group,
  Header,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import FooterDonasi from "../../component/footer_close_donasi";
import ComponentDonasi_HeaderTamplate from "../../component/header_tamplate";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donasi_funDeleteKabar } from "../../fun/delete/fun_delete.kabar";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";

export default function LayoutUpdateKabarDonasi({
  children,
  kabarId
}: {
  children: React.ReactNode;
  kabarId: string
}) {
  const router = useRouter();

  return (
    <>
      <AppShell
        header={<ComponentDonasi_HeaderTamplate title="Update Kabar" />}
        footer={
          <Footer height={70}>
            <Group align="center" h={"100%"} position="center" spacing={"xl"}>
              {/* <Button radius={"xl"} variant="outline" color="green">
                Edit
              </Button> */}
              <Button radius={"xl"} variant="outline" color="red" onClick={() => onDelete(router,kabarId )}>
                Hapus
              </Button>
            </Group>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}

async function onDelete(router: AppRouterInstance ,kabarId: string) {
  await Donasi_funDeleteKabar(kabarId)
  .then((res) => {
    if(res.status === 200){
      router.back()
      NotifBerhasil(res.message)
    } else {
      NotifGagal(res.message)
    }
  })
}
