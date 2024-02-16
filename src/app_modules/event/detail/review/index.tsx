"use client";

import { Button, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { MODEL_EVENT } from "../../model/interface";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import ComponentEvent_CatatanReject from "../../component/catatan_reject";

export default function Event_DetailReview({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentEvent_DetailData data={dataEvent} />
        <Button
          radius={"xl"}
          color={"red"}
          onClick={() => onClick(router, setTabsStatus, dataEvent.id)}
        >
          Batalkan Review
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
  await Event_funEditStatusById("3", eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 1500);
      setTabsStatus("Draft");
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
