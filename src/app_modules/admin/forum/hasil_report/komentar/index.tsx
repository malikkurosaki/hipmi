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
import { adminForum_funDeleteKomentarById } from "../../fun/delete/fun_delete_komentar_by_id";
import { useDisclosure } from "@mantine/hooks";

export default function AdminForum_HasilReportKomentar({
  komentarId,
  listReport,
}: {
  komentarId: string;
  listReport: any[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Hasil Report Komentar" />
        <Group position="apart">
          <ComponentAdminDonasi_TombolKembali />
          <ButtonDeleteKomentar komentarId={komentarId} />
        </Group>
        <HasilReportPosting listReport={listReport} />
        {/* <pre>{JSON.stringify(listReport, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonDeleteKomentar({ komentarId }: { komentarId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadindDel, setLoadingDel] = useState(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeleteKomentarById(komentarId).then((res) => {
      if (res.status === 200) {
        setLoadingDel(false);
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
                setLoadingDel(false);
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
        loading={loadindDel ? true : false}
        loaderPosition="center"
        radius={"xl"}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          open();
          setLoadingDel(true);
        }}
      >
        Hapus Komentar
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
      <Box>
        <Box bg={"red.1"} p={"xs"}>
          <Title order={6} c={"red"}>
            REPORT KOMENTAR
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
