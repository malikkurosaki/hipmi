"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
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
  TextInput,
  Textarea,
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
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_getListTableByStatusId } from "../fun/get/get_list_table_by_status_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";

export default function AdminEvent_TableReview({
  listReview,
}: {
  listReview: MODEL_EVENT[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Table Review" />
        <TableStatus listReview={listReview} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: MODEL_EVENT[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listReview);
  const [catatan, setCatatan] = useState("");
  const [eventId, setEventId] = useState("");

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>{e?.Author?.Profile?.name}</td>
      <td>{e.title}</td>
      <td>{e.lokasi}</td>
      <td>{e.EventMaster_TipeAcara.name}</td>
      <td>{e.tanggal.toLocaleString("id-ID", { dateStyle: "full" })}</td>
      <td>
        {e.tanggal.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td>
        <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
          {e.deskripsi}
        </Spoiler>
      </td>

      <td>
        <Stack>
          <Button
            color={"green"}
            leftIcon={<IconEyeShare />}
            radius={"xl"}
            onClick={() => onPublish(e.id, setData, e.tanggal)}
          >
            Publish
          </Button>
          <Button
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            onClick={() => {
              open();
              setEventId(e.id);
            }}
          >
            Reject
          </Button>
        </Stack>
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
                onReject(eventId, catatan, setData, close);

                // console.log("hehe")
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Box>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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

async function onPublish(eventId: string, setData: any, tanggal: Date) {
  if (moment(tanggal).diff(Date.now(), "minutes") < 0)
    return ComponentGlobal_NotifikasiPeringatan(
      "Waktu acara telah lewat, Report untuk memberitahu user !"
    );

  await AdminEvent_funEditStatusPublishById(eventId, "1").then(async (res) => {
    if (res.status === 200) {
      await AdminEvent_getListTableByStatusId("2").then((res) => {
        setData(res);
        ComponentGlobal_NotifikasiBerhasil("Berhasil update status");
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onReject(
  eventId: string,
  catatan: string,
  setData: any,
  close: any
) {
  if (catatan === "")
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Catatan");
  const body = {
    id: eventId,
    catatan: catatan,
  };

  await AdminEvent_funEditCatatanById(body as any, "4").then(async (res) => {
    if (res.status === 200) {
      await AdminEvent_getListTableByStatusId("2").then((val) => {
        setData(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
