"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Card, Center, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_JOB } from "../../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export default function ComponentJob_CardStatus({
  data,
  path,
}: {
  data: MODEL_JOB;
  path: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
        }}
        mb={"md"}
        shadow="lg"
        withBorder
        radius={"md"}
        p={20}
        onClick={() => {
          if (path === undefined) {
            ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
          } else {
            router.push(path + data.id);
            setVisible(true);
            // visible
            //   ? ""
            //   : (setJobId(e?.id), setVisible(true), router.push(path + e?.id));
          }
        }}
      >
        <Card.Section>
          <Center h={"100%"}>
            <Text mt={"md"} fw={"bold"} lineClamp={1} c={"white"}>
              {data?.title}
            </Text>
          </Center>
        </Card.Section>
        {visible ? <ComponentGlobal_CardLoadingOverlay /> : ""}
      </Card>
    </>
  );
}
