"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  MODEL_FORUM_POSTING,
  MODEL_FORUM_REPORT_POSTING,
} from "@/app_modules/forum/model/interface";
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
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_BackButton from "../../component_global/back_button";
import ComponentAdminGlobal_IsEmptyData from "../../component_global/is_empty_data";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";
import { adminForum_getListReportPostingById } from "../fun/get/get_list_report_posting_by_id";
import ComponentAdminForum_ViewOneDetailPosting from "../component/detail_one_posting";
import mqtt_client from "@/util/mqtt_client";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";

export default function AdminForum_HasilReportPosting({
  dataPosting,
  listReport,
}: {
  dataPosting: MODEL_FORUM_POSTING;
  listReport: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Hasil Report Posting" />
        <Group position="apart">
          <ComponentAdminGlobal_BackButton />
          <ButtonDeletePosting dataPosting={dataPosting} />
        </Group>
        <ComponentAdminForum_ViewOneDetailPosting dataPosting={dataPosting} />
        <HasilReportPosting
          listReport={listReport}
          postingId={dataPosting.id}
        />
        {/* <pre>{JSON.stringify(listReport, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonDeletePosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    const del = await adminForum_funDeletePostingById(dataPosting.id);
    if (del.status === 200) {
      setLoadingDel2(false);
      close();
      router.back();

      const dataNotif = {
        appId: dataPosting.id,
        status: "Report Posting",
        userId: dataPosting.authorId,
        pesan: dataPosting.diskusi,
        kategoriApp: "FORUM",
        title: "Postingan anda telah di laporkan",
      };
      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });
      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: dataPosting.authorId, count: 1 })
        );
      }

      ComponentGlobal_NotifikasiBerhasil(del.message);
    } else {
      ComponentGlobal_NotifikasiGagal(del.message);
    }
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={5}>Anda yakin menghapus posting ini</Title>
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
        radius={"xl"}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          // onDelete();
          open();
        }}
      >
        Hapus Posting
      </Button>
    </>
  );
}

function HasilReportPosting({
  listReport,
  postingId,
}: {
  listReport: any;
  postingId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[]>(
    listReport.data
  );
  const [nPage, setNPage] = useState(listReport.nPage);
  const [activePage, setActivePage] = useState(1);

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_getListReportPostingById({
      postingId: postingId,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text>{e?.User?.username}</Text>
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
            Report Postingan
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
                      <Center>Kategori</Center>
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
