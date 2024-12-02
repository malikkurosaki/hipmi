"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import {
  Box,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_funGetListPublish } from "../fun";
import QRCode from "react-qr-code";

export default function AdminEvent_TablePublish({
  listPublish,
}: {
  listPublish: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <TableStatus listPublish={listPublish} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[]>(listPublish.data);
  const [isNPage, setNPage] = useState(listPublish.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListPublish({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListPublish({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = _.isEmpty(data) ? (
    <tr>
      <td colSpan={12}>
        <Center>Belum Ada Data</Center>
      </td>
    </tr>
  ) : (
    data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center w={200}>
            <QRCode style={{ height: 50, width: 50 }} value={e.id} />
          </Center>
        </td>
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
            <Text align="center">
              {" "}
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "full",
              }).format(e?.tanggal)}
              ,{" "}
              <Text span inherit>
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(e?.tanggal)}
              </Text>
            </Text>
          </Center>
        </td>
        <td>
          <Center w={200}>
            <Text align="center">
              {" "}
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "full",
              }).format(e?.tanggalSelesai)}
              ,{" "}
              <Text span inherit>
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(e?.tanggalSelesai)}
              </Text>
            </Text>
          </Center>
        </td>

        <td>
          <Center w={400}>
            <Spoiler
              hideLabel="sembunyikan"
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e.deskripsi}
            </Spoiler>
          </Center>
        </td>

        <td>
          <Button
            loaderPosition="center"
            loading={
              e.id === eventId ? (loading === true ? true : false) : false
            }
            color={"green"}
            leftIcon={<IconCircleCheck />}
            radius={"xl"}
            onClick={async () => {
              setEventId(e.id);
              setLoading(true);
              router.push(RouterAdminEvent.detail_peserta + e.id);
            }}
          >
            Lihat Peserta
          </Button>
        </td>
      </tr>
    ))
  );

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Publish</Title>
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
                    <Center>QR Code</Center>
                  </th>

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
                    <Center>Tanggal & Waktu Mulai</Center>
                  </th>
                  <th>
                    <Center>Tanggal & Waktu Selesai</Center>
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
    </>
  );
}
