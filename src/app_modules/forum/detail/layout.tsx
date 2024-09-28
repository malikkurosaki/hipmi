"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React, { useState } from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/_global/loading_page_v2";
import { revalidatePath } from "next/cache";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";

export const dynamic = "force-dynamic";
export default function LayoutForum_Detail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Postingan" posotion={"left"} />}
      >
        {children}
      </UIGlobal_LayoutTamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} px={"md"}>
              <ActionIcon
                loading={loading ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Postingan</Title>
            </Group>
          </Header>
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
