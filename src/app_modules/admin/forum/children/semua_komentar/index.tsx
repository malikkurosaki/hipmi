"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
import ComponentAdminDonasi_TombolKembali from "@/app_modules/admin/donasi/component/tombol_kembali";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "@/app_modules/forum/model/interface";
import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { IconFlag3 } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeleteKomentarById } from "../../fun/delete/fun_delete_komentar_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { useDisclosure } from "@mantine/hooks";

export default function AdminForum_LihatSemuaKomentar({
  listKomentar,
  dataPosting,
}: {
  listKomentar: MODEL_FORUM_KOMENTAR[];
  dataPosting: MODEL_FORUM_POSTING;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(listKomentar, null, 2)}</pre> */}
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Komentar" />
        <ComponentAdminDonasi_TombolKembali />
        <DataPosting dataPosting={dataPosting} />
        <TableKomentar listKomentar={listKomentar} />
      </Stack>
    </>
  );
}

function DataPosting({ dataPosting }: { dataPosting: MODEL_FORUM_POSTING }) {
  return (
    <>
      <Stack w={"50%"}>
        <Box>
          <Box bg={"green.1"} p={"xs"}>
            <Title order={6} c={"green"}>
              POSTING
            </Title>
          </Box>
          <Paper withBorder p={"md"} radius={0}>
            <Stack spacing={0}>
              <Grid w={500} fw={"bold"}>
                <Grid.Col span={"content"}>
                  <Text>Author :</Text>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1}>
                    {dataPosting?.Author?.Profile?.name}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={"content"}>
                  <Spoiler
                    w={500}
                    hideLabel="sembunyikan"
                    maxHeight={100}
                    showLabel="tampilkan"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: dataPosting.diskusi }}
                    />
                  </Spoiler>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </>
  );
}

function TableKomentar({
  listKomentar,
}: {
  listKomentar: MODEL_FORUM_KOMENTAR[];
}) {
  const router = useRouter();
  // const [data, setData] = useState(listKomentar);

  const TableRows = listKomentar?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={"100%"}>
          <Text truncate>{e?.Author?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Spoiler
            w={400}
            maxHeight={50}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            <div
              style={{ textAlign: "center" }}
              dangerouslySetInnerHTML={{ __html: e.komentar }}
            />
          </Spoiler>
        </Center>
      </td>
      <td>
        <Center>
          <Text w={100}>
            {new Intl.DateTimeFormat(["id-ID"], { dateStyle: "medium" }).format(
              e.createdAt
            )}
          </Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text
            c={e?.Forum_ReportKomentar?.length >= 3 ? "red" : "black"}
            fw={"bold"}
            fz={"lg"}
          >
            {e?.Forum_ReportKomentar.length}
          </Text>
        </Center>
      </td>

      <td>
        <Stack align="center" spacing={"xs"}>
          <Button
            radius={"xl"}
            w={150}
            compact
            leftIcon={<IconFlag3 size={15} />}
            onClick={() =>
              router.push(RouterAdminForum.hasil_report_komentar + e?.id)
            }
          >
            Hasil Report
          </Button>
          <ButtonDeleteKomentar komentarId={e?.id} />
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Box>
        <Box bg={"gray.1"} p={"xs"}>
          <Title order={6} c={"gray"}>
            KOMENTAR
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
                  <Center>Komentar</Center>
                </th>
                <th>
                  <Center>Tanggal Komentar</Center>
                </th>
                <th>
                  <Center>Total Report Komentar</Center>
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
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
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
        w={150}
        fz={"xs"}
        compact
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
