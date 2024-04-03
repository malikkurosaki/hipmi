"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
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
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconMessageCircle, IconFlag3, IconTrash } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { useDisclosure } from "@mantine/hooks";

export default function AdminForum_HasilReportPosting({
  postingId,
  listReport,
}: {
  postingId: string;
  listReport: any[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Hasil Report Posting" />
        <Group position="apart">
          <ComponentAdminDonasi_TombolKembali />
          <ButtonDeletePosting postingId={postingId} />
        </Group>
        <HasilReportPosting listReport={listReport} />
        {/* <pre>{JSON.stringify(listReport, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonDeletePosting({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeletePostingById(postingId).then((res) => {
      if (res.status === 200) {
        setLoadingDel2(false);
        setLoadingDel(false);
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
                setLoadingDel(false);
              }}
            >
              Batal
            </Button>
            <Button
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
        loading={loadingDel ? true : false}
        radius={"xl"}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          // onDelete();
          open();
          setLoadingDel(true);
        }}
      >
        Hapus Posting
      </Button>
    </>
  );
}

function HasilReportPosting({
  listReport,
}: {
  listReport: MODEL_FORUM_REPORT[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listReport);

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Text w={200}>{e?.User?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center w={100}>
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
        <Center>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            {e?.deskripsi ? <Text>{e?.deskripsi}</Text> : <Text>-</Text>}
          </Spoiler>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Box>
        <Box bg={"red.1"} p={"xs"}>
          <Title order={6} c={"red"}>
            REPORT POSTING
          </Title>
        </Box>
        <ScrollArea w={"100%"}>
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
                <th>
                  <Center>Author</Center>
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
