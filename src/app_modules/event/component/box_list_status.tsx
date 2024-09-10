"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../model/interface";

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
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
        }}
        onClick={() => {
          setEventId(data?.id);
          setVisible(true);
          router.push(path + data.id);
        }}
      >
        <Stack>
          <Group w={"100%"} position="apart">
            <Title order={5} lineClamp={1} w={"70%"}>
              {data.title}
            </Title>
            <Text align="right" fz={"sm"} lineClamp={1} w={"20%"}>
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "medium",
              }).format(data.tanggal)}
            </Text>
          </Group>

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
