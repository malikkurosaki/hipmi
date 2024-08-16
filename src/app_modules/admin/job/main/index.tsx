"use client";

import { Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useRouter } from "next/navigation";

export default function AdminJob_Main({
  countPublish,
  countReview,
  countReject,
  countArsip,
}: {
  countPublish: number;
  countReview: number;
  countReject: number;
  countArsip: number
}) {
  const router = useRouter();

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      color: "green",
      text_color: "white",
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      color: "orange",
      text_color: "white",
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      color: "red",
      text_color: "white",
    },
    {
      id: 4,
      name: "Arsip",
      jumlah: countArsip,
      color: "gray",
      text_color: "white",
    },
  ];
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listStatus.map((e, i) => (
            <Paper
              key={i}
              bg={`${e.color}.2`}
              shadow="md"
              radius="md"
              p="md"
              // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Group position="center">
                <Stack align="center" spacing={0}>
                  <Text>{e.name}</Text>
                  <Title>{e.jumlah ? e.jumlah : 0}</Title>
                </Stack>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
