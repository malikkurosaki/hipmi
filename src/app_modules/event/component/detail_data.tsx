"use client";

import { Stack, Title, Grid, Text, Paper } from "@mantine/core";
import moment from "moment";

export default function ComponentEvent_DetailData() {
  return (
    <>
      <Paper withBorder p={"md"} shadow="lg">
        <Stack px={"sm"}>
          <Title order={4}>Nama Event</Title>
          <Grid>
            <Grid.Col span={3}>
              <Text fw={"bold"}>Lokasi</Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>Lokasi Acara</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text fw={"bold"}>Tanggal</Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>{moment(Date.now()).format("ll")}</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text fw={"bold"}>Jam</Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>{moment(Date.now()).format("LT")}</Grid.Col>
          </Grid>
          <Stack spacing={2}>
            <Text fw={"bold"}>Deskripsi</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              ipsum voluptate doloremque optio explicabo temporibus delectus
              voluptatum similique tempora voluptatem. Exercitationem veritatis
              tempora impedit ipsam, fugit vitae repellat sint fugiat
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
