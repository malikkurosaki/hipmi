"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
  Box,
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
import { IconBan, IconEyeShare, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import moment from "moment";
import { useState } from "react";
import { AdminVote_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../../fun/edit/fun_edit_status_reject_by_id";
import { AdminVote_getListTableByStatusId } from "../../fun/get/get_list_table_by_status_id";
import mqtt_client from "@/util/mqtt_client";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { adminVote_funGetListReview } from "../../fun";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function AdminVote_TableReview({
  listVote,
}: {
  listVote: MODEL_VOTING[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />
        <TableStatus listData={listVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: any }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<MODEL_VOTING[]>(listData.data);
  const [votingId, setVotingId] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);

  const [isNPage, setNPage] = useState(listData.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminVote_funGetListReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminVote_funGetListReview({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author?.username}</Center>
      </td>
      <td>
        <Center>{e.title}</Center>
      </td>
      <td>
        <Center>
          <Spoiler
            hideLabel="sembunyikan"
            maw={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>
      <th>
        <Stack>
          {e.Voting_DaftarNamaVote.map((v) => (
            <Box key={v.id}>
              <Text>- {v.value}</Text>
            </Box>
          ))}
        </Stack>
      </th>
      <td>
        <Center>
          {e.awalVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>
      <td>
        <Center>
          {e.akhirVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>

      <td>
        <Stack align="center">
          <Button
            loaderPosition="center"
            loading={
              e?.id === votingId ? (isLoadingPublish ? true : false) : false
            }
            w={120}
            color={"green"}
            leftIcon={<IconCircleCheckFilled />}
            radius={"xl"}
            onClick={() =>
              onPublish(
                e.id,
                setData,
                e.awalVote,
                setLoadingPublish,
                setVotingId
              )
            }
          >
            Publish
          </Button>
          <Button
            w={120}
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            onClick={() => {
              open();
              setVotingId(e.id);
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
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
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
                    <Center>Deskripsi</Center>
                  </th>
                  <th>
                    <Center>Pilihan</Center>
                  </th>
                  <th>
                    <Center>Mulai Vote</Center>
                  </th>
                  <th>
                    <Center>Selesai Vote</Center>
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
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isSaveLoading ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject(votingId, setData, catatan, close, setSaveLoading);
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

async function onPublish(
  voteId: string,
  setData: any,
  awalVote: Date,
  setLoadingPublish: any,
  setVotingId: any
) {
  const hariIni = new Date();
  const cekHari = moment(awalVote).diff(hariIni, "days");

  if (cekHari < 0)
    return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

  setVotingId(voteId);
  const res = await AdminVote_funEditStatusPublishById(voteId);
  if (res.status === 200) {
    const dataNotif = {
      appId: res.data?.id,
      status: res.data?.Voting_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "VOTING",
      title: "Voting publish",
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

    await AdminVote_getListTableByStatusId("2").then((val) => {
      setData(val);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setLoadingPublish(true);
    });
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}

async function onReject(
  voteId: string,
  setData: any,
  catatan: string,
  close: any,
  setSaveLoading: any
) {
  const data = {
    id: voteId,
    catatan: catatan,
  };

  const res = await AdminEvent_funEditCatatanById(data as any);
  if (res.status === 200) {
    const dataNotif = {
      appId: res.data?.id,
      status: res.data?.Voting_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "VOTING",
      title: "Voting anda di tolak !",
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

    await AdminVote_getListTableByStatusId("2").then((val) => {
      setData(val);
      setSaveLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      close();
    });
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
