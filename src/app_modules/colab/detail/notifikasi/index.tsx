"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { Center, Stack } from "@mantine/core";
import { MODEL_COLLABORATION_NOTIFIKSI } from "../../model/interface";
import ComponentColab_NotedBox from "../../component/noted_box";
import ComponentColab_DetailData from "../../component/detail/detail_data";

export default function Colab_DetailNotifikasi({
  data,
}: {
  data: MODEL_COLLABORATION_NOTIFIKSI;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentColab_HeaderTamplate title="Detail Notifikasi" />}
      >
        <DetailNotif data={data} />
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function DetailNotif({ data }: { data?: MODEL_COLLABORATION_NOTIFIKSI }) {
  return (
    <>
      <Stack px={"sm"}>
        <ComponentColab_NotedBox
          informasi={data?.ProjectCollaboration.report as any}
        />
        <ComponentColab_DetailData data={data?.ProjectCollaboration} />
      </Stack>
    </>
  );
}
