"use client";
"use dev";

import ComponentDonasi_IsEmptyData from "@/app_modules/donasi/component/is_empty_data";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import {
  Avatar,
  Center,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMoodSmile, IconMoodSmileBeam } from "@tabler/icons-react";
import _, { size } from "lodash";
import moment from "moment";
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
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {donatur.map((e, i) => (
          <Paper key={i} bg={"gray.1"} p={"sm"}>
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
      </SimpleGrid>
    </>
  );
}
