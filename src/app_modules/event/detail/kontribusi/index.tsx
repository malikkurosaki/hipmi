"use client";

import {
  Avatar,
  Center,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { MODEL_EVENT, MODEL_EVENT_PESERTA } from "../../model/interface";
import { useState } from "react";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";

export default function Event_DetailKontribusi({
  dataEvent,
  listKontributor,
  totalPeserta,
}: {
  dataEvent: MODEL_EVENT;
  listKontributor: MODEL_EVENT_PESERTA[];
  totalPeserta: number;
}) {
  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentEvent_DetailMainData data={dataEvent} />
        <ComponentEvent_ListPeserta
          listPeserta={listKontributor}
          total={totalPeserta}
        />
        {/* <Paper withBorder mt={"lg"} shadow="lg">
          <Stack spacing={"md"} p={"md"}>
            <Center>
              <Title order={5}>Daftar Peserta</Title>
            </Center>

            {peserta
              .map((e, i) => (
                <Stack key={i} spacing={"sm"}>
                  <Grid>
                    <Grid.Col span={2}>
                      <Avatar radius={"xl"} bg={"gray"} size={"md"} />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Stack justify="center" h={"100%"}>
                        <Text>Nama peserta</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
          </Stack>
        </Paper> */}
      </Stack>
    </>
  );
}
