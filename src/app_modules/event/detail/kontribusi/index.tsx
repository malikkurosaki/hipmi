"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { MODEL_EVENT, MODEL_EVENT_PESERTA } from "../../model/interface";

export default function Event_DetailKontribusi({
  dataEvent,
  listKontributor,
  totalPeserta,
}: {
  dataEvent: MODEL_EVENT;
  listKontributor: MODEL_EVENT_PESERTA[];
  totalPeserta: number;
}) {
  return (
    <>
      <Stack spacing={"lg"} mb={"md"}>
        <ComponentEvent_DetailMainData data={dataEvent} />
        <ComponentEvent_ListPeserta
          listPeserta={listKontributor}
          total={totalPeserta}
        />
      </Stack>
    </>
  );
}
