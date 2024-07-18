"use client";

import { Button, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { MODEL_EVENT } from "../../model/interface";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentEvent_CatatanReject from "../../component/catatan_reject";
import { useState } from "react";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";

export default function Event_DetailReview({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentEvent_DetailData data={dataEvent} />
        <ButtonAction eventId={dataEvent?.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading ? true : false}
        radius={"xl"}
        color={"orange"}
        onClick={() => setOpenModal(true)}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin batalkan review?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color={"orange"}
            onClick={() => onClick(router, setTabsStatus, eventId, setLoading)}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  setTabsStatus: any,
  eventId: string,
  setLoading: any
) {
  await Event_funEditStatusById("3", eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 1500);
      setTabsStatus("Draft");
      setLoading(true);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
