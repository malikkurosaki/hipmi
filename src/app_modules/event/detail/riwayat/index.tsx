"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  Stack
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { Event_countTotalPesertaById } from "../../fun/count/count_total_peserta_by_id";
import { Event_funJoinEvent } from "../../fun/create/fun_join_event";
import { Event_getListPesertaById } from "../../fun/get/get_list_peserta_by_id";
import { MODEL_EVENT, MODEL_EVENT_PESERTA } from "../../model/interface";

export default function Event_DetailRiwayat({
  dataEvent,
  listPeserta,
  totalPeserta,
}: {
  dataEvent: MODEL_EVENT;
  listPeserta: MODEL_EVENT_PESERTA[];
  totalPeserta: number;
}) {
  const router = useRouter();
  const [total, setTotal] = useState(totalPeserta);
  const [peserta, setPeserta] = useState(listPeserta);
  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <ComponentEvent_DetailMainData data={dataEvent} />
        <ComponentEvent_ListPeserta listPeserta={listPeserta} total={total} />
      </Stack>
    </>
  );
}

async function onJoin(
  userId: string,
  eventId: string,
  setPeserta: any,
  setTotal: any
) {
  const body = {
    userId: userId,
    eventId: eventId,
  };

  await Event_funJoinEvent(body as any).then(async (res) => {
    if (res.status === 200) {
      await Event_getListPesertaById(eventId).then(async (val) => {
        await Event_countTotalPesertaById(eventId).then((ttl) => {
          setPeserta(val);
          setTotal(ttl);
          ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        });
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
