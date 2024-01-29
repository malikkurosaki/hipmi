"use client";

import { Button, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { MODEL_EVENT } from "../../model/interface";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { useState } from "react";
import ComponentEvent_CatatanReject from "../../component/catatan_reject";

export default function Event_DetailDraft({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  return (
    <>
    {/* <pre>{JSON.stringify(dataEvent.catatan)}</pre> */}
      <Stack spacing={"lg"}>
        {dataEvent.catatan ? (
          <ComponentEvent_CatatanReject catatan={dataEvent.catatan} />
        ) : (
          ""
        )}
        <ComponentEvent_DetailData data={dataEvent} />
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            onClick(router, setTabsStatus, dataEvent.id);
          }}
        >
          Ajukan Review
        </Button>
      </Stack>
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  setTabsStatus: any,
  eventId: string
) {
  await Event_funEditStatusById("2", eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 1500);
      setTabsStatus("Review");
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
