"use client";

import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_ViewRekapBerita } from "../../_view";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export function Investasi_UiRekapBerita({
  investasiId,
  dataBerita,
}: {
  investasiId: string;
  dataBerita: any[]
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Berita",
      icon: <IconCirclePlus />,
      path: NEW_RouterInvestasi.create_berita({ id: investasiId }),
    },
  ];

  return (
    <UIGlobal_LayoutTamplate
      header={
        <UIGlobal_LayoutHeaderTamplate
          title="Rekap Berita"
          customButtonRight={
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              <IconDotsVertical color="white" />
            </ActionIcon>
          }
        />
      }
    >


      <Investasi_ViewRekapBerita dataBerita={dataBerita} />

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </UIGlobal_LayoutTamplate>
  );
}
