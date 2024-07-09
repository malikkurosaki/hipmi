"use client"

import { Stack, Paper, Text, List, Box } from "@mantine/core";
import { useState } from "react";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/component_global/color/color_pallet";

export function ComponentForum_UiDetailReportKomentar({
  dataKomentar,
}: {
  dataKomentar: any;
}) {
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR>(dataKomentar.data);
  const [list, setList] = useState<any[]>(dataKomentar.list);
  return (
    <>
      <Box
        p={"md"}
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <Stack c="white">
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
                <List.Item c={"white"} key={i}>{x}</List.Item>
              ))}
            </List>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}