"use client";

import { Button, Group, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { MODEL_EVENT } from "../../model/interface";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import React, { useState } from "react";
import ComponentEvent_CatatanReject from "../../component/catatan_reject";
import { useRouter } from "next/navigation";

export default function Event_DetailDraft({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(dataEvent.catatan)}</pre> */}
      <Stack spacing={"lg"}>
        {dataEvent?.catatan ? (
          <ComponentEvent_CatatanReject catatan={dataEvent?.catatan} />
        ) : (
          ""
        )}
        <ComponentEvent_DetailData data={dataEvent} />
        <ButtonAction eventId={dataEvent?.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);

  async function onDelete() {
    console.log(eventId);
  }

  async function onAjukan() {
    await Event_funEditStatusById("2", eventId).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        setTabsStatus("Review");
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            onAjukan();
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            // onClick(router, setTabsStatus, dataEvent.id);
          }}
        >
          Hapus
        </Button>
      </Group>
    </>
  );
}
