"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import {
  Box,
  Center,
  Group,
  List,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";
import { useState } from "react";

export default function Forum_DetailReportKomentar({
  dataKomentar,
}: {
  dataKomentar: any;
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentForum_HeaderTamplate title="Report Komentar" />}
      >
        {<View dataKomentar={dataKomentar} />}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function View({ dataKomentar }: { dataKomentar: any }) {
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR>(dataKomentar.data);
  const [list, setList] = useState<any[]>(dataKomentar.list);
  return (
    <>
      <Stack>
        <Text fw={"bold"} align="center" mb={"lg"}>
          Komentar anda telah dihapus dari sebuah postingan oleh ADMIN, karena
          memiliki beberapa laporan dari pengguna lain !
        </Text>

        <Stack spacing={"xs"}>
          <Text fw={"bold"}>Komentar anda</Text>
          <Paper withBorder p={"sm"}>
            <Text>
              <div dangerouslySetInnerHTML={{ __html: data.komentar }} />
            </Text>
          </Paper>
        </Stack>

        <Stack spacing={"xs"}>
          <Text fw={"bold"}>
            Pada postingan : {data.Forum_Posting.Author.username}
          </Text>
          <Paper withBorder p={"sm"}>
            <Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.Forum_Posting.diskusi,
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
