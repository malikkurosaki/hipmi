"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Investasi_ViewRekapDokumen } from "../../_view";

export function Investasi_UiRekapDokumen({
  investasiId,
  dataDokumen,
}: {
  investasiId: string;
  dataDokumen: any[]
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Dokumen",
      icon: <IconCirclePlus />,
      path: NEW_RouterInvestasi.create_dokumen({ id: investasiId }),
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Rekap Dokumen"
            customButtonRight={
              <ActionIcon
                onClick={() => setOpenDrawer(true)}
                variant="transparent"
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        <Investasi_ViewRekapDokumen
          dataDokumen={dataDokumen}
          investasiId={investasiId}
        />
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
