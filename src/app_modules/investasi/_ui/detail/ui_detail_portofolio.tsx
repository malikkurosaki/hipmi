"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import {
  IconCategoryPlus,
  IconDotsVertical,
  IconEdit,
  IconFilePencil,
} from "@tabler/icons-react";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";
import {
  Investasi_ViewDetailDraft,
  Investasi_ViewDetailPublish,
  Investasi_ViewDetailReject,
  Investasi_ViewDetailReview,
} from "../../_view";

export function Investasi_UiDetailPortofolio({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Edit Investasi",
      icon: <IconEdit />,
      path: NEW_RouterInvestasi.edit_investasi({ id: data.id }),
    },
    {
      id: "2",
      name: "Edit Prospektus",
      icon: <IconFilePencil />,
      path: NEW_RouterInvestasi.edit_prospektus({ id: data.id }),
    },
    {
      id: "3",
      name: "Tambah & Edit Dokumen",
      icon: <IconCategoryPlus />,
      path: NEW_RouterInvestasi.rekap_dokumen({ id: data.id }),
    },
  ];

  if (data.masterStatusInvestasiId == "3")
    return (
      <>
        <UIGlobal_LayoutTamplate
          header={
            <UIGlobal_LayoutHeaderTamplate
              title={`Detail Draft`}
              customButtonRight={
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              }
            />
          }
        >
          <Investasi_ViewDetailDraft dataInvestasi={data} />
        </UIGlobal_LayoutTamplate>

        <UIGlobal_Drawer
          opened={openDrawer}
          close={() => setOpenDrawer(false)}
          component={listPage}
        />
      </>
    );

  return (
    <UIGlobal_LayoutTamplate
      header={
        <UIGlobal_LayoutHeaderTamplate
          title={`Detail ${data.MasterStatusInvestasi.name}`}
        />
      }
    >
      {data.masterStatusInvestasiId === "1" && (
        <Investasi_ViewDetailPublish dataInvestasi={data} />
      )}

      {data.masterStatusInvestasiId === "2" && (
        <Investasi_ViewDetailReview dataInvestasi={data} />
      )}

      {data.masterStatusInvestasiId === "4" && (
        <Investasi_ViewDetailReject dataInvestasi={data} />
      )}
    </UIGlobal_LayoutTamplate>
  );
}
