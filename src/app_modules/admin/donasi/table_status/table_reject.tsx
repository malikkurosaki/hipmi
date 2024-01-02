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

export default function AdminDonasi_TableReject({
  dataReject,
}: {
  dataReject: MODEL_DONASI[];
}) {
  return (
    <>
      <Stack>
        <AdminDonasi_TombolKembali />
        <TableStatus dataReject={dataReject} />
      </Stack>
    </>
  );
}

function TableStatus({ dataReject }: { dataReject: MODEL_DONASI[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [donasi, setDonasi] = useState(dataReject);

  function onClick() {
    return (
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Alasan penolakan</Title>
          <Text>{"test"}</Text>
        </Stack>
      </Modal>
    );
  }

  const TableRows = donasi.map((e, i) => (
    <tr key={i}>
      <td>{e.title}</td>
      <td>
        <TampilanRupiahDonasi nominal={+e.target} />
      </td>
      <td>{e.DonasiMaster_Ketegori.name}</td>
      <td>{e.DonasiMaster_Durasi.name} hari</td>
      <td>{e.catatan}</td>
      <td>
        <Center>
          <Button
            compact
            color={"red"}
            leftIcon={<IconEyeCheck />}
            radius={"xl"}
            variant="outline"
            onClick={() => {
             onClick()
              // onClick(e.catatan);
            }}
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
        <Box bg={"red.1"} p={"xs"}>
          <Title order={6} c={"red"}>
            REJECT
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
              <th>Catatan</th>
              <th>
                <Center>Lihat alasan</Center>
              </th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
      </Box>
    </>
  );
}
