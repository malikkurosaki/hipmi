"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Grid, Stack, Text, Title } from "@mantine/core";
import { MODEL_EVENT } from "../../model/interface";

export default function ComponentEvent_DetailData({
  data,
}: {
  data: MODEL_EVENT;
}) {
  const tgl = data.tanggal;
  const hari = tgl.toLocaleString("id-ID", { dateStyle: "full" });

  const jam = tgl.toLocaleTimeString([], {
    timeStyle: "short",
    hourCycle: "h24",
  });

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"16px"}>
        <Stack px={"sm"} spacing={"lg"}>
          <Title lineClamp={2} align="center" w={"100%"} order={4}>
            {data ? data?.title : null}
          </Title>
          <Grid>
            <Grid.Col span={4}>
              <Text fw={"bold"} fz={"sm"}>
                Lokasi
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{data ? data?.lokasi : null}</Text>
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
              <Text>{data ? data.EventMaster_TipeAcara?.name : null}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>
              <Text fw={"bold"} fz={"sm"}>
                Tanggal
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>{hari ? hari : ""}</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>
              <Text fw={"bold"} fz={"sm"}>
                Jam
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>{jam ? jam : ""}</Grid.Col>
          </Grid>
          <Stack spacing={2}>
            <Text fw={"bold"} fz={"sm"}>
              Deskripsi
            </Text>
            <Text>{data ? data?.deskripsi : null}</Text>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
