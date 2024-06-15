"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";

import { MODEL_DONASI_KABAR } from "../../model/interface";
import { useRouter } from "next/navigation";

export default function ComponentDonasi_ListKabar({
  kabar,
  route
}: {
  kabar: MODEL_DONASI_KABAR;
  route: string
}) {
  const router = useRouter();
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
                  router.push(route + `${kabar.id}`)
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
