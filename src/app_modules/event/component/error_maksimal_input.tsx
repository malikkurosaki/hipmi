"use client";

import { Group, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ComponentEvent_ErrorMaximalInput({
  max,
  text,
}: {
  max?: number;
  text?: string;
}) {
  return (
    <>
      <Group spacing={"xs"}>
        <IconAlertTriangle size={15} />
        <Text fz={10} fs={"italic"}>
          {text ? text : ` Maksimal ${max} karakter !`}
        </Text>
      </Group>
    </>
  );
}
