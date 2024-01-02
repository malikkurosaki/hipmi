"use client";

import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconEyeCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";

export default function AdminDonasi_TablePublish({
  listPublish,
}: {
  listPublish: MODEL_DONASI;
}) {
  return (
    <>
      <Stack>
        <AdminDonasi_TombolKembali />
        <TableStatus listPublish={listPublish as any} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: MODEL_DONASI[] }) {
  const router = useRouter();
  const [donasi, setDonasi] = useState(listPublish);
  async function onClick() {
    router.push(RouterAdminDonasi.detail_publish);
  }

  const TableRows = donasi.map((e, i) => (
    <tr key={i}>
      <td>{e.title}</td>
      <td>
        <TampilanRupiahDonasi nominal={+e.target} />
      </td>
      <td>{e.DonasiMaster_Ketegori.name}</td>
      <td>{e.DonasiMaster_Durasi.name} hari</td>
      <td>
       <Center>
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
       </Center>
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
              <th>Judul</th>
              <th>Target</th>
              <th>Ketegori</th>
              <th>Durasi</th>
              <th><Center>Aksi</Center></th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
      </Box>
    </>
  );
}
