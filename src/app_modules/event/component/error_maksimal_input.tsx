"use client"

import { Group, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ComponentEvent_ErrorMaximalInput({max}:{max: number}){
    return (
      <>
        <Group spacing={"xs"}>
          <IconAlertTriangle size={15} />
          <Text fz={10} fs={"italic"}>
            Maksimal {max} karakter !
          </Text>
        </Group>
      </>
    );
}