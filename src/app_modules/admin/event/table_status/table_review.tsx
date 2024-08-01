"use client";

import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  Spoiler,
  Stack,
  Table,
  Textarea,
  Title,
} from "@mantine/core";
import { IconBan, IconEyeShare } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useDisclosure } from "@mantine/hooks";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import mqtt_client from "@/util/mqtt_client";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";
import { AdminEvent_getListTableByStatusId } from "../fun/get/get_list_table_by_status_id";
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
          timeStyle: "short",
          hourCycle: "h24",
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

  const res = await AdminEvent_funEditStatusPublishById(eventId, "1");
  if (res.status === 200) {
    const dataNotif = {
      appId: res.data?.id,
      status: res.data?.EventMaster_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "EVENT",
      title: "Event publish",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotif as any,
    });

    if (notif.status === 201) {
      mqtt_client.publish(
        "USER",
        JSON.stringify({ userId: res?.data?.authorId, count: 1 })
      );
    }

    await AdminEvent_getListTableByStatusId("2").then((res) => {
      setData(res);
      ComponentGlobal_NotifikasiBerhasil("Berhasil update status");
    });
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
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

  const res  = await AdminEvent_funEditCatatanById(body as any, "4");
  if (res.status === 200) {
    const dataNotif = {
      appId: res.data?.id,
      status: res.data?.EventMaster_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "EVENT",
      title: "Event anda di tolak !",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotif as any,
    });

    if (notif.status === 201) {
      mqtt_client.publish(
        "USER",
        JSON.stringify({ userId: res?.data?.authorId, count: 1 })
      );
    }

    await AdminEvent_getListTableByStatusId("2").then((val) => {
      setData(val);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      close();
    });
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
