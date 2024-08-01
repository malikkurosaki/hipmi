"use client";

import ComponentEvent_DetailData from "../../component/detail/detail_data";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_DetailPublish({
  dataEvent,
  listPeserta,
  totalPeserta,
}: {
  dataEvent: MODEL_EVENT;
  listPeserta: any[];
  totalPeserta: number;
}) {
  return (
    <>
      <ComponentEvent_DetailData data={dataEvent} />
      <ComponentEvent_ListPeserta
        listPeserta={listPeserta}
        total={totalPeserta}
      />
    </>
  );
}
