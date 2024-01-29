"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../model/interface";
import ComponentEvent_BoxListStatus from "../component/box_list_status";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";

export default function Event_Beranda({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT[];
}) {
  const router = useRouter();
  return (
    <>
      {dataEvent.map((e, i) => (
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
            onClick={() => router.push(RouterEvent.detail_main + e.id)}
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
