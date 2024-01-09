"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import router from "next/router";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export default function ComponentDonasi_ListKabar({
  kabar,

}: {
  kabar: MODEL_DONASI_KABAR;

}) {
  return (
    <>
      <Paper bg={"gray.1"} p={"md"}>
        <Stack>
          <Text fz={"xs"}>{moment(kabar.createdAt).format("ll")}</Text>

          <Stack>
            <Title order={5}>{kabar.title}</Title>
            <Stack spacing={0}>
              <Text lineClamp={2}>{kabar.deskripsi}</Text>
              <Text
                c={"blue"}
                onClick={() =>
                  router.push(RouterDonasi.update_kabar + `${kabar.id}`)
                }
              >
                Buka Kabar
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
