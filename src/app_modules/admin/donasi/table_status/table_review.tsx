"use client";

import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconEyeCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";
import { useDisclosure } from "@mantine/hooks";
import AdminDonasi_DetailReview from "../detail_table/detail_review";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";

export default function AdminDonasi_TableReview({
  listReview,
}: {
  listReview: MODEL_DONASI[];
}) {
  return (
    <>
      <Stack>
        <AdminDonasi_TombolKembali />
        <TableStatus listReview={listReview} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: MODEL_DONASI[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [donasi, setDonasi] = useState(listReview);

  async function onClick() {
    // router.push(RouterAdminDonasi.detail_publish);
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
          color={"orange"}
          leftIcon={<IconEyeCheck />}
          radius={"xl"}
          variant="outline"
          onClick={() => router.push(RouterAdminDonasi.detail_review + `${e.id}`)}
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
        <Box bg={"orange.1"} p={"xs"}>
          <Title order={6} c={"orange"}>
            REVIEW
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
              <th>
                <Center>Aksi</Center>
              </th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
      </Box>

    
    </>
  );
}
