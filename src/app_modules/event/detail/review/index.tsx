"use client";

import { Button, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Event_DetailReview() {

  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentEvent_DetailData />
        <Button radius={"xl"} color={"red"} onClick={() => onClick(router, setTabsStatus)}>
          Batalkan Review
        </Button>
      </Stack>
    </>
  );
}

async function onClick(router: AppRouterInstance, setTabsStatus: any) {
    ComponentGlobal_NotifikasiBerhasil("Review Dibatalkan", 1500)
    setTabsStatus("Draft")
    router.back()
}
