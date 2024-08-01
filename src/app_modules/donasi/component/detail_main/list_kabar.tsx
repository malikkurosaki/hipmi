"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";

import { MODEL_DONASI_KABAR } from "../../model/interface";
import { useRouter } from "next/navigation";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentDonasi_ListKabar({
  kabar,
  route,
}: {
  kabar: MODEL_DONASI_KABAR;
  route: string;
}) {
  const router = useRouter();
  return (
    <>
      <Paper
        style={{
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.darkblue}`,
          padding: "15px",
          cursor: "pointer",
          borderRadius: "10px",
          color: "white",
          marginBottom: "5px",
        }}
        onClick={() => router.push(route + `${kabar.id}`)}
      >
        <Stack>
          <Text fz={"xs"}>{moment(kabar.createdAt).format("ll")}</Text>

          <Title order={5}>{kabar.title}</Title>
        </Stack>
      </Paper>
    </>
  );
}
