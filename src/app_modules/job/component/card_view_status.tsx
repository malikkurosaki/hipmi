"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Card, Center, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_JOB } from "../model/interface";

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
        <ComponentGlobal_IsEmptyData />
      </>
    );

  return (
    <>
      <Stack>
        {listData?.map((e, i) => (
          <Card
            style={{
              backgroundColor: MainColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
            }}
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
            <Card.Section>
              <Center h={"100%"}>
                <Text mt={"md"} fw={"bold"} lineClamp={1} c={"white"}>
                  {e?.title}
                </Text>
              </Center>
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
