"use client";

import { Stack, Title, Grid, Text, Paper, Spoiler } from "@mantine/core";
import moment from "moment";
import { MODEL_EVENT } from "../../model/interface";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";

export default function ComponentEvent_DetailMainData({
  data,
}: {
  data: MODEL_EVENT;
}) {
  const tgl = data.tanggal;
  const hari = tgl.toLocaleString("id-ID", { dateStyle: "full" });

  const jam = tgl.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Paper withBorder p={"md"} shadow="lg">
        <Stack>
          <ComponentGlobal_AuthorNameOnHeader
            authorName={data.Author.Profile.name}
            imagesId={data.Author.Profile.imagesId}
            profileId={data.Author.Profile.id}
          />
          <Stack px={"sm"}>
            <Title order={4}>{data ? data.title : null}</Title>
            <Grid>
              <Grid.Col span={4}>
                <Text fw={"bold"} fz={"sm"}>
                  Lokasi
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{data ? data.lokasi : null}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>
                <Text fw={"bold"} fz={"sm"}>
                  Tipe Acara
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{data ? data.EventMaster_TipeAcara.name : null}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>
                <Text fw={"bold"} fz={"sm"}>
                  Tanggal
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>{hari}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>
                <Text fw={"bold"} fz={"sm"}>
                  Jam
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>{jam}</Grid.Col>
            </Grid>
            <Stack spacing={2}>
              <Text fw={"bold"} fz={"sm"}>
                Deskripsi
              </Text>
              <Spoiler
                hideLabel="Lihat sedikit"
                maxHeight={50}
                showLabel="Lihat banyak"
              >
                {data ? data.deskripsi : null}
              </Spoiler>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
