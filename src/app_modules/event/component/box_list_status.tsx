"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Paper, Stack, Group, Title, Text, Grid, Card } from "@mantine/core";
import moment from "moment";
import { MODEL_EVENT } from "../model/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export default function ComponentEvent_BoxListStatus({
  data,
  path,
}: {
  data: MODEL_EVENT;
  path: string;
}) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        shadow="lg"
        radius={"md"}
        p={"md"}
        withBorder
        mb={"sm"}
        onClick={() => {
          setEventId(data?.id);
          setVisible(true);
          router.push(path + data.id);
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={8}>
              <Title order={6} truncate>
                {data.title}
              </Title>
            </Grid.Col>
            <Grid.Col span={4}>
              <Text fz={"sm"} truncate>
                {moment(data.tanggal).format("ll")}
              </Text>
            </Grid.Col>
          </Grid>

          <Text fz={"sm"} lineClamp={2}>
            {data.deskripsi}
          </Text>
        </Stack>
        {visible && eventId !== "" ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
