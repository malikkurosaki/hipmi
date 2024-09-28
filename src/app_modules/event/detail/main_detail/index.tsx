"use client";

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { MODEL_EVENT, MODEL_EVENT_PESERTA } from "../../model/interface";
import _ from "lodash";
import { Event_funJoinEvent } from "../../fun/create/fun_join_event";
import { useState } from "react";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { Event_getListPesertaById } from "../../fun/get/get_list_peserta_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import { useRouter } from "next/navigation";
import { Event_countTotalPesertaById } from "../../fun/count/count_total_peserta_by_id";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";

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
      <Stack spacing={"lg"}>
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

  await Event_funJoinEvent(body as any).then(async (res) => {
    if (res.status === 200) {
      await Event_getListPesertaById(eventId).then(async (val) => {
        await Event_countTotalPesertaById(eventId).then((ttl) => {
          setPeserta(val);
          setTotal(ttl);
          setLoading(true);
          ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        });
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
