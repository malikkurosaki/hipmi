"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconCircleCheck, IconSearch } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { adminEvent_funGetListReview } from "../fun";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";

export default function AdminEvent_TableReview({
  listData,
}: {
  listData: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <TableStatus listData={listData} />
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[]>(listData.data);
  const [isNPage, setNPage] = useState(listData.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [opened, { open, close }] = useDisclosure(false);
  const [catatan, setCatatan] = useState("");
  const [eventId, setEventId] = useState("");

  // const dataEvent = {} as  Prisma.UserUncheckedCreateInput;

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListReview({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPublish(eventId: string, tanggal: Date) {
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

      const loadData = await adminEvent_funGetListReview({
        search: isSearch,
        page: isActivePage,
      });
      setData(loadData.data as any);
      setNPage(loadData.nPage);
      ComponentAdminGlobal_NotifikasiBerhasil("Berhasil update status");
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onReject(eventId: string, catatan: string) {
    if (catatan === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Catatan");
    const body = {
      id: eventId,
      catatan: catatan,
    };

    const res = await AdminEvent_funEditCatatanById(body as any, "4");
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

      const loadData = await adminEvent_funGetListReview({
        search: isSearch,
        page: isActivePage,
      });
      setData(loadData.data as any);
      setNPage(loadData.nPage);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      close();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text lineClamp={2}>{e.title}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>{e.lokasi}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>{e.EventMaster_TipeAcara.name}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          {e.tanggal.toLocaleString("id-ID", { dateStyle: "full" })}
        </Center>
      </td>
      <td>
        <Center w={200}>
          {e.tanggal.toLocaleTimeString([], {
            timeStyle: "short",
            hourCycle: "h24",
          })}
        </Center>
      </td>
      <td>
        <Center w={400}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>

      <td>
        <Center>
          <Stack>
            <Button
              color={"green"}
              leftIcon={<IconCircleCheck />}
              radius={"xl"}
              onClick={() => onPublish(e.id, e.tanggal)}
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
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Review</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Username</Center>
                  </th>
                  <th>
                    <Center>Judul</Center>
                  </th>
                  <th>
                    <Center>Lokasi</Center>
                  </th>
                  <th>
                    <Center>Tipe Acara</Center>
                  </th>
                  <th>
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Jam</Center>
                  </th>
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
          </ScrollArea>

          <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"md"}
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
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onReject(eventId, catatan);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
