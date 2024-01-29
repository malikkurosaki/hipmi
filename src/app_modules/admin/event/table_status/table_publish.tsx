"use client";

import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBan,
  IconChevronLeft,
  IconEyeCheck,
  IconEyeShare,
  IconShare,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import ComponentAdminDonasi_TombolKembali from "../../donasi/component/tombol_kembali";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import moment from "moment";
import _ from "lodash";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { AdminEvent_getListTableByStatusId } from "../fun/get/get_list_table_by_status_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function AdminEvent_TablePublish({
  listPublish,
}: {
  listPublish: MODEL_EVENT[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <ComponentAdminDonasi_TombolKembali />
        <TableStatus listPublish={listPublish} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: MODEL_EVENT[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listPublish);

  async function onClick() {
    // router.push(RouterAdminDonasi.detail_publish);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>{e.title}</td>
      <td>{e.lokasi}</td>
      <td>{e.EventMaster_TipeAcara.name}</td>
      <td>
        {moment(e.tanggal).format("dddd")}, {moment(e.tanggal).format("ll")}
      </td>
      <td>{moment(e.tanggal).format("LT")}</td>
      <td>
        <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
          {e.deskripsi}
        </Spoiler>
      </td>

      <td>
        <Button
          color={"green"}
          leftIcon={<IconEyeShare />}
          radius={"xl"}
          onClick={() => console.log("cooming soon")}
        >
          Lihat Peserta
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
              <th>Judul</th>
              <th>Lokasi</th>
              <th>Tipe Acara</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>
                <Center>Deskripsi</Center>
              </th>

              <th>
                <Center>Aksi</Center>
              </th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
        <Center>
          {_.isEmpty(TableRows) ? (
            <Center h={"50vh"}>
              <Title order={6}>Tidak Ada Data</Title>
            </Center>
          ) : (
            ""
          )}
        </Center>
      </Box>
    </>
  );
}


