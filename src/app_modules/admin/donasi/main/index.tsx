"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
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

export default function AdminDonasi_Main({
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
      link: RouterAdminDonasi_OLD.table_publish,
      color: "green",
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      link: RouterAdminDonasi_OLD.table_review,
      color: "orange",
    },
    {
      id: 3,
      name: "Draft",
      jumlah: countDraft,
      link: "",
      color: "yellow",
    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      link: RouterAdminDonasi_OLD.table_reject,
      color: "red",
    },
  ];
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />

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

      {/* <Stack spacing={"sm"}>
        <Title>Donasi</Title>
        <Divider mb={"md"} />
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
                {e.link !== "" ? (
                  <ActionIcon radius={"xl"} onClick={() => router.push(e.link)}>
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
      </Stack> */}
    </>
  );
}
