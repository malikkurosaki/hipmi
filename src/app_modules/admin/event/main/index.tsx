"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";

import {
  Stack,
  Title,
  Divider,
  SimpleGrid,
  Paper,
  Center,
  Text,
  Box,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconChevronsRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";


export default function AdminEvent_Main({
  countPublish,
  countReview,
  countDraft,
  countReject,
}: {
  countPublish: number;
  countReview: number;
  countDraft: number;
  countReject: number;
}) {
  const router = useRouter();
  const listBox = [
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
    {
      id: 3,
      name: "Draft",
      jumlah: countDraft,
      path: "",
      color: "yellow",
    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      path: RouterAdminEvent.table_reject,
      color: "red",
    },
  ];
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Event"/>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox.map((e, i) => (
            <Paper
              key={i}
              bg={`${e.color}.2`}
              shadow="md"
              radius="md"
              p="md"
              //   sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Group position="apart">
                <IconChevronsRight color={`${e.color}.2`} />
                <Stack align="center" spacing={0}>
                  <Text>{e.name}</Text>
                  <Title>{e.jumlah}</Title>
                </Stack>
                {e.path !== "" ? (
                  <ActionIcon radius={"xl"} onClick={() => router.push(e.path)}>
                    {" "}
                    <IconChevronsRight />
                  </ActionIcon>
                ) : (
                  <ActionIcon variant="transparent" disabled></ActionIcon>
                )}
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
