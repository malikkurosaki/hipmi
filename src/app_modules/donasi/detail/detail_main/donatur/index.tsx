"use client";
"use dev";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentDonasi_IsEmptyData from "@/app_modules/donasi/component/is_empty_data";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import { Center, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconMoodSmileBeam } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";

export default function DonaturDonasi({
  listDonatur,
}: {
  listDonatur: MODEL_DONASI_INVOICE[];
}) {
  const [donatur, setDonatur] = useState(listDonatur);
  if (_.isEmpty(donatur)) return <ComponentDonasi_IsEmptyData />;

  return (
    <>
      {donatur.map((e, i) => (
        <Paper
          key={i}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "10px",
          }}
        >
          <Grid>
            <Grid.Col span={3}>
              <Center h={"100%"}>
                {/* <Avatar variant="filled" radius={"xl"} size={"md"} /> */}
                <IconMoodSmileBeam size={50} />
              </Center>
            </Grid.Col>
            <Grid.Col span={9}>
              <Stack spacing={0}>
                <Title order={5}>{e.Author.username}</Title>
                <Group spacing={"xs"}>
                  <Text fz={"xs"}>Berdonasi sebesar</Text>
                  <Text truncate fw={"bold"}>
                    <TampilanRupiahDonasi nominal={+e.nominal} />
                  </Text>
                </Group>
                <Text fz={"xs"}>
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "full",
                  }).format(e?.createdAt)}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      ))}
    </>
  );
}
