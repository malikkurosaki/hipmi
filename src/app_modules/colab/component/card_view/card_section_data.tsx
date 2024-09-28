"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/_global/loading_page_v2";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Card, Center, Title, Stack, Grid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function ComponentColab_CardSectionData({
  colabId,
  path,
  data,
}: {
  colabId?: any;
  path?: any;
  data?: MODEL_COLLABORATION;
}) {
  const router = useRouter();

  return (
    <>
      <Card.Section
        px={"md"}
        onClick={() => {
          if (path) {
            router.push(path + colabId);
          } else {
            ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
          }
        }}
      >
        <Center px={"md"} mb={"lg"}>
          <Title order={5} lineClamp={1}>
            {data?.title ? data.title : "Judul Proyek"}
          </Title>
        </Center>
        <Stack spacing={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <Text fw={"bold"} fz={"xs"}>
                Industri
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fz={"xs"}>:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text fz={"xs"} lineClamp={1}>
                {data?.ProjectCollaborationMaster_Industri.name
                  ? data?.ProjectCollaborationMaster_Industri?.name
                  : "Industri"}
              </Text>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={2}>
              <Text fw={"bold"} fz={"xs"}>
                Lokasi
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fz={"xs"}>:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text fz={"xs"} lineClamp={1}>
                {data?.lokasi ? data?.lokasi : "Lokasi dari proyek"}
              </Text>
            </Grid.Col>
          </Grid>

          <Stack spacing={5}>
            <Text fw={"bold"} fz={"xs"}>
              Tujuan proyek
            </Text>
            <Text lineClamp={3} fz={"xs"}>
              {data?.purpose
                ? data?.purpose
                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores odio nihil in animi expedita, suscipit excepturi pariatur totam esse officiis enim cumque. Quidem, facere aliquam. Sunt laboriosam incidunt iste amet"}
            </Text>
          </Stack>
        </Stack>
      </Card.Section>
    </>
  );
}
