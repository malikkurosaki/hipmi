"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Card, Stack, Grid, Title, Text, Center } from "@mantine/core";
import moment from "moment";
import { MODEL_EVENT } from "../../model/interface";
import { useRouter } from "next/navigation";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import _ from "lodash";

export default function Event_RiwayatSaya({ data }: { data: MODEL_EVENT[] }) {
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <Center h={"80vh"}>
        <Text fw={"bold"} fz={"sm"}>
          Tidak Ada Event
        </Text>
      </Center>
    );

  return (
    <>
      {data.map((e, i) => (
        <Card key={e.id} shadow="lg" radius={"md"} withBorder mb={"sm"}>
          <Card.Section px={"sm"} pt={"sm"}>
            <ComponentGlobal_AuthorNameOnHeader
              profileId={e.Author.Profile.id}
              imagesId={e.Author.Profile.imagesId}
              authorName={e.Author.Profile.name}
            />
          </Card.Section>
          <Card.Section
            p={"sm"}
            onClick={() => router.push(RouterEvent.detail_riwayat + e.id)}
          >
            <Stack>
              <Grid>
                <Grid.Col span={8}>
                  <Title order={6} truncate>
                    {e.title}
                  </Title>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text fz={"sm"} truncate>
                    {moment(e.tanggal).format("ll")}
                  </Text>
                </Grid.Col>
              </Grid>

              <Text fz={"sm"} lineClamp={2}>
                {e.deskripsi}
              </Text>
            </Stack>
          </Card.Section>
        </Card>
      ))}
    </>
  );
}
