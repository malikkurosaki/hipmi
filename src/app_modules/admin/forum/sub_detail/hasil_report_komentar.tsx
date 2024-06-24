"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import ComponentAdminDonasi_TombolKembali from "@/app_modules/admin/donasi/component/tombol_kembali";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import {
  MODEL_FORUM_MASTER_REPORT,
  MODEL_FORUM_REPORT,
} from "@/app_modules/forum/model/interface";
import {
  Badge,
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
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconMessageCircle,
  IconFlag3,
  IconTrash,
  IconSearch,
} from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";
import { adminForum_funDeleteKomentarById } from "../fun/delete/fun_delete_komentar_by_id";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import ComponentAdminGlobal_IsEmptyData from "../../component_global/is_empty_data";
import { adminForum_getListReportKomentarbyId } from "../fun/get/get_list_report_komentar_by_id";
import ComponentAdminGlobal_BackButton from "../../component_global/back_button";

export default function AdminForum_HasilReportKomentar({
  komentarId,
  listReport,
}: {
  komentarId: string;
  listReport: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Hasil Report Komentar" />
        <Group position="apart">
          <ComponentAdminGlobal_BackButton />
          <ButtonDeleteKomentar komentarId={komentarId} />
        </Group>
        <HasilReportPosting listReport={listReport} komentarId={komentarId} />
        {/* <pre>{JSON.stringify(listReport, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonDeleteKomentar({ komentarId }: { komentarId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeleteKomentarById(komentarId).then((res) => {
      if (res.status === 200) {
        setLoadingDel2(false);
        close();
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={5}>Anda yakin menghapus komentar ini ?</Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingDel2 ? true : false}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete();
                setLoadingDel2(true);
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Button
        loaderPosition="center"
        radius={"xl"}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          open();
        }}
      >
        Hapus Komentar
      </Button>
    </>
  );
}

function HasilReportPosting({
  listReport,
  komentarId,
}: {
  listReport: any;
  komentarId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT[]>(listReport.data);
  const [nPage, setNPage] = useState(listReport.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_getListReportKomentarbyId({
      komentarId: komentarId,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text>{e?.User?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>
            {e?.ForumMaster_KategoriReport?.title
              ? e?.ForumMaster_KategoriReport?.title
              : "-"}
          </Text>
        </Center>
      </td>

      <td>
        <Center w={500}>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            {e?.ForumMaster_KategoriReport?.deskripsi ? (
              <Text>{e?.ForumMaster_KategoriReport?.deskripsi}</Text>
            ) : (
              <Text>-</Text>
            )}
          </Spoiler>
        </Center>
      </td>

      <td>
        <Center w={500}>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            {e?.deskripsi ? <Text>{e?.deskripsi}</Text> : <Text>-</Text>}
          </Spoiler>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Report Komentar
          </Title>
          {/* <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari postingan"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          /> */}
        </Group>

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
          <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}
                striped
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>
                      <Center>Username</Center>
                    </th>
                    <th>
                      <Center>Title</Center>
                    </th>
                    <th>
                      <Center>Deskripsi</Center>
                    </th>
                    <th>
                      <Center>Deskripsi Lainnya</Center>
                    </th>
                  </tr>
                </thead>

                <tbody>{TableRows}</tbody>
              </Table>
            </ScrollArea>
            <Center mt={"xl"}>
              <Pagination
                value={activePage}
                total={nPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
      </Stack>
    </>
  );
}
