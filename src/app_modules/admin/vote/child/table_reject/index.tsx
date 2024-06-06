"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import { AdminEvent_getListPesertaById } from "@/app_modules/admin/event/fun/get/get_list_peserta_by_id";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminVote_funEditCatatanRejectById } from "../../fun/edit/fun_edit_catatan_reject_by_id";
import { AdminVote_getListTableByStatusId } from "../../fun/get/get_list_table_by_status_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function AdminVote_TableReject({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting: Table Reject" />
        <TableStatus listData={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: MODEL_VOTING[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listData);
  const [votingId, setVotingId] = useState("");
  const [catatan, setCatatan] = useState("");

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Button
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            onClick={() => {
              open();
              setVotingId(e.id);
              setCatatan(e.catatan);
            }}
          >
            <Stack spacing={0}>
              <Text fz={10}>Tambah</Text>
              <Text fz={10}>Catatan</Text>
            </Stack>
          </Button>
        </Center>
      </td>
      <td>
        <Center>
          <Spoiler
            hideLabel="sembunyikan"
            maw={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            {e.catatan}
          </Spoiler>
        </Center>
      </td>
      <td>
        <Center>{e?.Author?.Profile?.name}</Center>
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
    </tr>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"lg"}
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            autosize
            label="Masukan Alasan Penolakan"
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            value={catatan}
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                onReject(votingId, catatan, close, setData);
                console.log(catatan);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Box>
        <Box bg={"red.1"} p={"xs"}>
          <Title order={6} c={"red"}>
            REJECT
          </Title>
        </Box>
        <ScrollArea w={"100%"}>
          <Box w={2000}>
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
                    <Center>Aksi</Center>
                  </th>
                  <th>
                    <Center>Catatan</Center>
                  </th>
                  <th>
                    <Center>Author</Center>
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
                </tr>
              </thead>
              <tbody>{TableRows}</tbody>
            </Table>
          </Box>
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

async function onReject(
  votingId: string,
  catatan: string,
  close: any,
  setData: any
) {
  await AdminVote_funEditCatatanRejectById(votingId, catatan).then(
    async (res) => {
      if (res.status === 200) {
        await AdminVote_getListTableByStatusId("4").then((val) => {
          setData(val);
          ComponentGlobal_NotifikasiBerhasil(res.message);
          close();
        });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    }
  );
}
