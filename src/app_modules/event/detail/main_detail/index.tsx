"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { Event_countTotalPesertaById } from "../../fun/count/count_total_peserta_by_id";
import { Event_funJoinEvent } from "../../fun/create/fun_join_event";
import { Event_getListPesertaById } from "../../fun/get/get_list_peserta_by_id";
import { MODEL_EVENT, MODEL_EVENT_PESERTA } from "../../model/interface";
import mqtt_client from "@/util/mqtt_client";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { IRealtimeData } from "@/app/lib/global_state";
import { WibuRealtime } from "wibu-pkg";

export default function Event_DetailMain({
  dataEvent,
  listPeserta,
  userLoginId,
  isJoin,
  totalPeserta,
}: {
  dataEvent: MODEL_EVENT;
  listPeserta: MODEL_EVENT_PESERTA[];
  userLoginId: string;
  isJoin: boolean;
  totalPeserta: number;
}) {
  const router = useRouter();
  const [total, setTotal] = useState(totalPeserta);
  const [peserta, setPeserta] = useState(listPeserta);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Stack spacing={"lg"} pb={"md"}>
        <ComponentEvent_DetailMainData data={dataEvent} />
        {isJoin ? (
          <Button disabled radius={"xl"} color="green">
            Anda Telah Ikut Serta
          </Button>
        ) : (
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            color="green"
            onClick={() => {
              onJoin(
                userLoginId,
                dataEvent.id,
                setPeserta,
                setTotal,
                setLoading
              );
            }}
          >
            JOIN
          </Button>
        )}

        <ComponentEvent_ListPeserta listPeserta={listPeserta} total={total} />
      </Stack>
    </>
  );
}

async function onJoin(
  userId: string,
  eventId: string,
  setPeserta: any,
  setTotal: any,
  setLoading: any
) {
  const body = {
    userId: userId,
    eventId: eventId,
  };

  const userLoginId = userId;

  const res = await Event_funJoinEvent(body as any);
  if (res.status === 200) {
    // const dataNotif = {
    //   appId: res?.data?.Event?.id,
    //   userId: res?.data?.Event?.authorId,
    //   pesan: res?.data?.Event?.title,
    //   status: "Peserta Event",
    //   kategoriApp: "EVENT",
    //   title: "Peserta baru telah masuk !",
    // };

    const dataNotifikasi: IRealtimeData = {
      appId: res?.data?.Event?.id as any,
      status: "Peserta Event" as any,
      userId: res.data?.Event?.authorId as any,
      pesan: res.data?.Event?.title as any,
      kategoriApp: "EVENT",
      title: "Peserta baru event anda !",
    };

    const createNotifikasi = await notifikasiToUser_funCreate({
      data: dataNotifikasi as any,
    });

    if (createNotifikasi.status === 201) {
      WibuRealtime.setData({
        type: "notification",
        pushNotificationTo: "USER",
        dataMessage: dataNotifikasi,
      });

    }

    const resPeserta = await Event_getListPesertaById(eventId);
    setPeserta(resPeserta);

    const resTotal = await Event_countTotalPesertaById(eventId);
    setTotal(resTotal);
    setLoading(true);
    ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
