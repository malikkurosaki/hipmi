"use client";

import { Group, Highlight, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

export default function DialogPageCreateInvestasi() {
  return (
    <>
      <Stack h={"80vh"} align="center" justify="center">
        <Title order={3}>Berhasil Membuat Proyek Investasi</Title>
        <IconCircleCheck size={100} color="green" />
        
      </Stack>
    </>
  );
}
