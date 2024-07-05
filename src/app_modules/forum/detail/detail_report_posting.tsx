"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { List, Paper, Stack, Text } from "@mantine/core";
import { MODEL_FORUM_POSTING } from "../model/interface";
import { useState } from "react";

export default function Forum_DetailReportPosting({
  dataPosting,
}: {
  dataPosting: any;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentForum_HeaderTamplate title="Report Posting" />}
      >
        <View dataPosting={dataPosting} />
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function View({ dataPosting }: { dataPosting: any }) {
  const [data, setData] = useState<MODEL_FORUM_POSTING>(dataPosting.data);
  const [list, setList] = useState<any[]>(dataPosting.list);

  return (
    <>
      <Stack>
        <Text fw={"bold"} align="center" mb={"lg"}>
          Postingan anda telah dihapus dari beranda oleh ADMIN, karena memiliki
          beberapa laporan dari pengguna lain !
        </Text>

        <Stack spacing={"xs"}>
          <Text fw={"bold"}>Pada postingan</Text>
          <Paper withBorder p={"sm"}>
            <Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.diskusi,
                }}
              />
            </Text>
          </Paper>
        </Stack>

        <Stack spacing={"xs"}>
          <Text fw={"bold"}>Laporan yang diterima :</Text>
          <List withPadding>
            {list.map((x, i) => (
              <List.Item key={i}>{x}</List.Item>
            ))}
          </List>
        </Stack>
      </Stack>
    </>
  );
}
