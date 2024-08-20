"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconFilePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutEditDokumenInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string;
}) {
  const router = useRouter();
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Dokumen",
      icon: <IconFilePlus />,
      path: RouterInvestasi_OLD.upload_dokumen + `${idInves}`,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Daftar Dokumen"
            // iconRight={<IconEdit />}
            // routerRight={RouterInvestasi.upload_dokumen + `${idInves}`}
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setIsOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={isOpenDrawer}
        close={() => setIsOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
