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
import ComponentAdminDonasi_TombolKembali from "../component/tombol_kembali";
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
        <ComponentAdminDonasi_TombolKembali />
        <TableStatus dataReject={dataReject} />
      </Stack>
    </>
  );
}

function TableStatus({ dataReject }: { dataReject: MODEL_DONASI[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [donasi, setDonasi] = useState(dataReject);

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
            color={"red"}
            leftIcon={<IconEyeCheck />}
            radius={"xl"}
            variant="outline"
            onClick={() => router.push(RouterAdminDonasi.detail_reject + `${e.id}`)}
          >
            Tampilkan
          </Button>
        </Center>

        {/* <ModalReject opened={opened} close={close} /> */}
      </td>
    </tr>
  ));

  return (
    <>
      {donasi.map((e,i) => (
        <Modal
          key={e.id}
          opened={opened}
          onClose={close}
          centered
          withCloseButton={false}
        >
          <Stack>
            <Title order={6}>Alasan penolakan</Title>
            <Text>{i}</Text>
          </Stack>
        </Modal>
      ))}
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

async function ModalReject(opened: any, close: any) {
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Alasan penolakan</Title>
          <Text>{"test"}</Text>
        </Stack>
      </Modal>
    </>
  );
}
