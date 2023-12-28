"use client";

import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconEyeCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";

export default function AdminDonasi_TablePublish() {
  return (
    <>
      <Stack>
        <AdminDonasi_TombolKembali />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  async function onClick() {
    router.push(RouterAdminDonasi.detail_publish);
  }

  const TableRows = Array(5)
    .fill(0)
    .map((e, i) => (
      <tr key={i}>
        <td>{`User ${i + 1}`}</td>
        <td>{`Judul ${i + 1}`}</td>
        <td>
          <Button
            compact
            color={"green"}
            leftIcon={<IconEyeCheck />}
            radius={"xl"}
            variant="outline"
            onClick={onClick}
          >
            Tampilkan
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      <Box>
        <Box bg={"green.1"} p={"xs"}>
          <Title order={6} c={"green"}>
            PUBLISH
          </Title>
        </Box>
        <Table
          withBorder
          verticalSpacing={"md"}
          horizontalSpacing={"xl"}
          p={"md"}
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Judul</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
      </Box>
    </>
  );
}
