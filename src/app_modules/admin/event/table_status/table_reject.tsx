"use client";

import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconBan,
  IconChevronLeft,
  IconEyeCheck,
  IconEyeShare,
  IconPencilPlus,
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
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";

export default function AdminEvent_TableReject({
  listReject,
}: {
  listReject: MODEL_EVENT[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Table Reject" />
        <TableStatus listReject={listReject} />
      </Stack>
    </>
  );
}

function TableStatus({ listReject }: { listReject: MODEL_EVENT[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listReject);
  const [eventId, setEventId] = useState("");
  const [catatan, setCatatan] = useState("");

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Box w={200}>{e?.Author?.Profile?.name}</Box>
      </td>
      <td>
        <Box w={200}>{e.title}</Box>
      </td>
      <td>
        <Box w={200}>{e.lokasi}</Box>
      </td>
      <td>
        <Box w={200}>{e.EventMaster_TipeAcara.name}</Box>
      </td>
      <td>
        <Box w={200}>
          {e.tanggal.toLocaleString("id-ID", { dateStyle: "full" })}
        </Box>
      </td>
      <td>
        <Box w={100}>
          {e.tanggal.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Box>
      </td>
      <td>
        <Box w={500}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.deskripsi}
          </Spoiler>
        </Box>
      </td>
      <td>
        {" "}
        <Box w={400}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.catatan}
          </Spoiler>
        </Box>
      </td>

      <td>
        <Button
          color={"red"}
          leftIcon={<IconPencilPlus />}
          radius={"xl"}
          onClick={() => {
            setEventId(e.id);
            setCatatan(e.catatan);
            open();
          }}
        >
          Tambah Catatan
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"lg"}
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            value={catatan}
            autosize
            label="Masukan Alasan Penolakan"
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                onUpdate(eventId, catatan, close as any, setData);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Box>
        <Box bg={"red.1"} p={"xs"}>
          <Title order={6} c={"red"}>
            REJECT
          </Title>
        </Box>
        <ScrollArea w={"100%"}>
          <Table
            w={2000}
            withBorder
            verticalSpacing={"md"}
            horizontalSpacing={"xl"}
            p={"md"}
            striped
            highlightOnHover
          >
            <thead>
              <tr>
                <th>Author</th>
                <th>Judul</th>
                <th>Lokasi</th>
                <th>Tipe Acara</th>
                <th>Tanggal</th>
                <th>Jam</th>
                <th>
                  <Center>Deskripsi</Center>
                </th>
                <th>
                  <Center>Catatan</Center>
                </th>

                <th>
                  <Center>Aksi</Center>
                </th>
              </tr>
            </thead>
            <tbody>{TableRows}</tbody>
          </Table>
        </ScrollArea>
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

async function onUpdate(
  eventId: string,
  catatan: string,
  close: any,
  setData: any
) {
  const body = {
    id: eventId,
    catatan: catatan,
  };
  await AdminEvent_funEditCatatanById(body as any, "4").then(async (res) => {
    if (res.status === 200) {
      await AdminEvent_getListTableByStatusId("4").then((val) => {
        setData(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
