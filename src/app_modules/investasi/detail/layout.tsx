"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, Group, Header, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutDetailInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Detail" />
          // <Header height={50} style={{ borderStyle: "none" }}>
          //   <Group h={50} position="apart" px={"md"}>
          //     <ActionIcon
          //       variant="transparent"
          //       onClick={() => {
          //         router.back();
          //       }}
          //     >
          //       <IconChevronLeft />
          //     </ActionIcon>
          //     <Title order={5}>Detail Investasi</Title>
          //     <ActionIcon
          //       variant="transparent"
          //       disabled
          //       onClick={() => {
          //         router.replace("");
          //       }}
          //     >
          //       {/* <IconEdit /> */}
          //     </ActionIcon>
          //   </Group>
          // </Header>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
