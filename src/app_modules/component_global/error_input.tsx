"use client";

import { Group, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ComponentGlobal_ErrorInput({
  max,
  text,
  color,
}: {
  max?: number;
  text?: string;
  color?: string;
}) {
  return (
    <>
      <Group spacing={"xs"}>
        <IconAlertTriangle size={15} color={color ? color : "red"} />
        <Text fz={10} fs={"italic"} color={color ? color : "red"}>
          {text ? text : ` Maksimal ${max ? max : "-"} karakter !`}
        </Text>
      </Group>
    </>
  );
}
