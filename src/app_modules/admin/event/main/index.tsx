"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";

import {
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";

export default function AdminEvent_Main({
  countPublish,
  countReview,
  countDraft,
  countReject,
  countTipeAcara,
  countRiwayat,
}: {
  countPublish: number;
  countReview: number;
  countDraft: number;
  countReject: number;
  countTipeAcara: number;
  countRiwayat: number
}) {
  const router = useRouter();

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      path: RouterAdminEvent.table_publish,
      color: "green",
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      path: RouterAdminEvent.table_review,
      color: "orange",
    },
    // {
    //   id: 3,
    //   name: "Draft",
    //   jumlah: countDraft,
    //   path: "",
    //   color: "yellow",
    // },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      path: RouterAdminEvent.table_reject,
      color: "red",
    },
  ];

  const listBox2 = [
    {
      id: 1,
      name: "Riwayat Event",
      jumlah: countRiwayat,
      path: RouterAdminEvent.table_publish,
      color: "gray",
    },
    {
      id: 2,
      name: "Tipe Acara",
      jumlah: countTipeAcara,
      path: RouterAdminEvent.table_publish,
      color: "gray",
    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />

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
                  <Title>{e.jumlah}</Title>
                </Stack>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox2.map((e, i) => (
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
                  <Title>{e.jumlah}</Title>
                </Stack>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
