"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  MODEL_EVENT,
  MODEL_EVENT_PESERTA,
} from "@/app_modules/event/model/interface";
import {
  Avatar,
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
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_funGetListAllRiwayat } from "../fun";
import { adminEvent_getListPesertaById } from "../fun/get/get_list_peserta_by_id";
import { useRouter } from "next/navigation";
import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";

export default function AdminEvent_Riwayat({
  listRiwayat,
}: {
  listRiwayat: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Riwayat" />
        <DetailRiwayat listRiwayat={listRiwayat} />
      </Stack>
    </>
  );
}

function DetailRiwayat({ listRiwayat }: { listRiwayat: any }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [peserta, setPeserta] = useState<MODEL_EVENT_PESERTA[]>();
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_EVENT[]>(listRiwayat.data);
  const [isNPage, setNPage] = useState(listRiwayat.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListAllRiwayat({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListAllRiwayat({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Button
          loading={e.id === eventId && loading ? true : false}
          color={"green"}
          leftIcon={<IconCircleCheck />}
          radius={"xl"}
          onClick={() => {
            router.push(RouterAdminEvent.detail_peserta + e.id);
            // setEventId(e.id);
            // setLoading(true);
            // await new Promise((v) => setTimeout(v, 500));
            // await AdminEvent_getListPesertaById(e.id).then((res: any) => {
            //   setPeserta(res);
            //   setLoading(false);
            // });
            // open();
          }}
        >
          Lihat Peserta
        </Button>
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
    </tr>
  ));

  // useShallowEffect(() => {
  //   getAllPeserta(eventId);
  // }, [eventId]);

  // async function getAllPeserta(eventId: string) {
  //   await adminEvent_getListPesertaById(eventId).then((res: any) =>
  //     setPeserta(res)
  //   );
  // }

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Riwayat</Title>
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
              w={"100%"}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Aksi</Center>
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
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Jam</Center>
                  </th>
                  <th>
                    <Center>Deskripsi</Center>
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
        size={"md"}
        // closeOnClickOutside={false}
        withCloseButton={false}
      >
        <Paper>
          <Stack>
            <Center>
              <Title order={3}>Daftar Peserta</Title>
            </Center>
            <Stack>
              {peserta?.map((e) => (
                <Stack key={e.id} spacing={"xs"}>
                  <Grid>
                    <Grid.Col span={"content"}>
                      <Avatar
                        sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                        radius={"xl"}
                        src={
                          RouterProfile.api_foto_profile +
                          e?.User?.Profile?.imagesId
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Group align="center" h={"100%"}>
                        <Text>{e?.User?.Profile?.name}</Text>
                      </Group>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}
