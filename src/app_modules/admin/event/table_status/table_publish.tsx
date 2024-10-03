"use client";

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
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
import { IconCircleCheck, IconEyeShare, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  MODEL_EVENT,
  MODEL_EVENT_PESERTA,
} from "@/app_modules/event/model/interface";
import _ from "lodash";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_getListPesertaById } from "../fun/get/get_list_peserta_by_id";
import { adminEvent_funGetListPublish } from "../fun";
import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";

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
        <Button
          loading={e.id === eventId ? (loading === true ? true : false) : false}
          color={"green"}
          leftIcon={<IconCircleCheck />}
          radius={"xl"}
          onClick={async () => {
            router.push(RouterAdminEvent.detail_peserta + e.id);
          }}
        >
          Lihat Peserta
        </Button>
      </td>
    </tr>
  ));

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
    </>
  );
}
