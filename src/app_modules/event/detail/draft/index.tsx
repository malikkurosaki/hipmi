"use client";

import { Button, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail_data";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Event_DetailDraft() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentEvent_DetailData />
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            onClick(router, setTabsStatus);
          }}
        >
          Ajukan Review
        </Button>
      </Stack>
    </>
  );
}

async function onClick(router: AppRouterInstance, setTabsStatus: any) {
    ComponentGlobal_NotifikasiBerhasil("Berhasil Diajukan", 1500)
    setTabsStatus("Review")
    router.back()
}
