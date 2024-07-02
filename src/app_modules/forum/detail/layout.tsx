"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React, { useState } from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { revalidatePath } from "next/cache";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_UI_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import ComponentGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

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
      <ComponentGlobal_UI_LayoutTamplate
        header={<ComponentGlobal_UI_HeaderTamplate title="Postingan" posotion={"left"} />}
      >
        {children}
      </ComponentGlobal_UI_LayoutTamplate>

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
