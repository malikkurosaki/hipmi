"use client";

import { Stack, Card, Grid, Image, Text, Center } from "@mantine/core";
import _ from "lodash";
import ComponentJob_IsEmptyData from "./is_empty_data";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { MODEL_JOB } from "../model/interface";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/component_global/loading_card";

export default function ComponentJob_CardViewStatus({
  listData,
  path,
}: {
  listData?: MODEL_JOB[];
  path?: any;
}) {
  const router = useRouter();
  const [jobId, setJobId] = useState("");
  const [visible, setVisible] = useState(false);

  if (_.isEmpty(listData))
    return (
      <>
        <ComponentJob_IsEmptyData text="Data tidak ada" />
      </>
    );

  return (
    <>
      <Stack>
        {listData?.map((e, i) => (
          <Card
            key={i}
            shadow="lg"
            withBorder
            radius={"md"}
            p={20}
            onClick={() => {
              if (path === undefined) {
                return ComponentGlobal_NotifikasiPeringatan(
                  "Path tidak ditemukan"
                );
              } else {
                visible
                  ? ""
                  : (setJobId(e?.id),
                    setVisible(true),
                    router.push(path + e?.id));
              }
            }}
          >
            <Card.Section px={"sm"}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Center h={"100%"}>
                    <Text fw={"bold"} lineClamp={1}>
                      {e?.title}
                    </Text>
                  </Center>
                </Grid.Col>
              </Grid>
            </Card.Section>
            {visible && e?.id === jobId ? (
              <ComponentGlobal_CardLoadingOverlay />
            ) : (
              ""
            )}
          </Card>
        ))}
      </Stack>
    </>
  );
}
