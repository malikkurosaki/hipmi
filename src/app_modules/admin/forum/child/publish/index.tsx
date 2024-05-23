"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
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
import { IconMessageCircle } from "@tabler/icons-react";
import { IconFlag3 } from "@tabler/icons-react";
import { IconEyeCheck, IconTrash } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { useDisclosure } from "@mantine/hooks";

export default function AdminForum_TablePublish({
  listPublish,
}: {
  listPublish: MODEL_FORUM_POSTING[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Table Posting" />
        <TablePublish listPublish={listPublish} />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function TablePublish({ listPublish }: { listPublish: MODEL_FORUM_POSTING[] }) {
  const router = useRouter();
  // const [data, setData] = useState(listPublish);

  const TableRows = listPublish?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text lineClamp={1}>{e?.Author?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center w={100}>
          <Badge
            color={
              (e?.ForumMaster_StatusPosting?.id as any) === 1 ? "green" : "red"
            }
          >
            {e?.ForumMaster_StatusPosting?.status}
          </Badge>
        </Center>
      </td>
      <td>
        <Center w={400}>
          <Spoiler
            // w={400}
            maxHeight={60}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.diskusi }} />
          </Spoiler>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text>
            {new Intl.DateTimeFormat(["id-ID"], { dateStyle: "medium" }).format(
              e.createdAt
            )}
          </Text>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text fw={"bold"} fz={"lg"}>
            {e?.Forum_Komentar.length}
          </Text>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text
            c={e?.Forum_ReportPosting?.length >= 3 ? "red" : "black"}
            fw={"bold"}
            fz={"lg"}
          >
            {e?.Forum_ReportPosting.length}
          </Text>
        </Center>
      </td>
      <td>
        <Stack align="center" spacing={"xs"}>
          <ButtonAction postingId={e?.id} />
          <ButtonDeletePosting postingId={e?.id} />
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Box>
        <Box bg={"green.1"} p={"xs"}>
          <Title order={6} c={"green"}>
            POSTING
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
                  <Center>Status</Center>
                </th>
                <th>
                  <Center>Postingan</Center>
                </th>
                <th>
                  <Center>Tanggal Publish</Center>
                </th>
                <th>
                  <Center>Komentar Aktif</Center>
                </th>
                <th>
                  <Center>Total Report Posting</Center>
                </th>
                <th>
                  <Center>Aksi</Center>
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

function ButtonAction({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [loadingKomentar, setLoadingKomentar] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  return (
    <>
      <Button
        loading={loadingKomentar ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={150}
        compact
        leftIcon={<IconMessageCircle size={15} />}
        onClick={() => {
          setLoadingKomentar(true);
          router.push(RouterAdminForum.semua_komentar + postingId);
        }}
      >
        Lihat Komentar
      </Button>
      <Button
        loading={loadingReport ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={150}
        compact
        leftIcon={<IconFlag3 size={15} />}
        onClick={() => {
          setLoadingReport(true);
          router.push(RouterAdminForum.hasil_report_posting + postingId);
        }}
      >
        Hasil Report
      </Button>
    </>
  );
}

function ButtonDeletePosting({ postingId }: { postingId: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeletePostingById(postingId).then((res) => {
      if (res.status === 200) {
        setLoadingDel2(false);
        setLoadingDel(false);
        close();
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
        loading={loadingDel ? true : false}
        radius={"xl"}
        w={150}
        compact
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
