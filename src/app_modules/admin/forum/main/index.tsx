"use client";

import { Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import ComponentAdminGlobal_LoadingPage from "../../component/loading_admin_page";

export default function AdminForum_Main() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <ForumMain />
      </Stack>
      {/* <ComponentGlobalAdmin_LoadingPage /> */}
    </>
  );
}

function ForumMain() {
  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: 0,
      color: "green",
    },
    {
      id: 2,
      name: "Laporan Posting",
      jumlah: 0,
      color: "orange",
    },
    {
      id: 3,
      name: "Laporan Komentar",
      jumlah: 0,
      color: "red",
    },
  ];
  return (
    <>
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
            bg={`${"gray"}.2`}
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
    </>
  );
}
