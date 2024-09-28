"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import { AdminEvent_getListPesertaById } from "@/app_modules/admin/event/fun/get/get_list_peserta_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  MODEL_EVENT,
  MODEL_EVENT_PESERTA,
} from "@/app_modules/event/model/interface";
import {
  MODEL_VOTE_KONTRIBUTOR,
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "@/app_modules/vote/model/interface";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEyeCheck, IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminVote_getHasilById } from "../../fun/get/get_hasil_by_id";
import { AdminVote_getListKontributorById } from "../../fun/get/get_list_kontributor_by_id";
import ComponentAdminVote_DetailHasil from "../../component/detail_hasil";

export default function AdminVote_TablePublish({
  dataVote,
}: {
  dataVote: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting: Table Publish" />
        <TableStatus listPublish={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: MODEL_VOTING[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listPublish);
  const [hasil, setHasil] = useState<any[]>();
  const [kontributor, setKontributor] = useState<any[]>();
  const [voteId, setVoteId] = useState("");
  const [loading, setLoading] = useState(false);

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Button
            loading={
              e?.id === voteId ? (loading === true ? true : false) : false
            }
            radius={"xl"}
            color="green"
            leftIcon={<IconEyeCheck />}
            onClick={async () => {
              setVoteId(e?.id);
              setLoading(true);
              await new Promise((r) => setTimeout(r, 500));
              onList(e?.id, setHasil, setKontributor, setLoading, open);
            }}
          >
            Lihat Hasil
          </Button>
        </Center>
      </td>
      <td>
        <Center>{e?.Author?.Profile?.name}</Center>
      </td>
      <td>
        <Center>{e?.title}</Center>
      </td>
      <td>
        <Center>
          <Spoiler
            hideLabel="sembunyikan"
            maw={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            {e?.deskripsi}
          </Spoiler>
        </Center>
      </td>
      <th>
        <Stack>
          {e?.Voting_DaftarNamaVote.map((v) => (
            <Box key={v?.id}>
              <Text>- {v?.value}</Text>
            </Box>
          ))}
        </Stack>
      </th>
      <td>
        <Center>
          {e?.awalVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>
      <td>
        <Center>
          {e?.akhirVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        withCloseButton={false}
      >
        <ComponentAdminVote_DetailHasil
          hasil={hasil}
          kontributor={kontributor}
        />
      </Modal>
      <Box>
        <Box bg={"green.1"} p={"xs"}>
          <Title order={6} c={"green"}>
            PUBLISH
          </Title>
        </Box>
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

async function onList(
  voteId: string,
  setHasil: any,
  setKontributor: any,
  setLoading: any,
  open: any
) {
  await AdminVote_getHasilById(voteId).then((res) => {
    setHasil(res);
    setLoading(false);
  });

  await AdminVote_getListKontributorById(voteId).then((res) => {
    setKontributor(res);
    setLoading(false);
  });

  open();
}
