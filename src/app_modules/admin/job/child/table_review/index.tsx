"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
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
  Image,
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
import { IconBan, IconEyeCheck, IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminJob_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import { AdminJob_getListTableByStatusId } from "../../fun/get/get_list_table_by_status_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";

export default function AdminJob_TableReview({ dataVote }: { dataVote?: any }) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy: Table Review" />
        <TableStatus listReview={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: MODEL_JOB[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listReview);
  const [reject, setReject] = useState(false);
  const [img, setImg] = useState("");
  const [jobId, setJobId] = useState("");
  const [catatan, setCatatan] = useState("");

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Spoiler
          w={200}
          maxHeight={50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          {e.title}
        </Spoiler>
      </td>
      <td>
        <Center w={150}>
          {e.imagesId ? (
            <Button
              color="green"
              radius={"xl"}
              leftIcon={<IconEyeCheck />}
              onClick={() => {
                setImg(e.imagesId);
                open();
              }}
            >
              Lihat
            </Button>
          ) : (
            <Center w={150}>
              <Text fw={"bold"} fz={"xs"} fs={"italic"}>
                Tidak ada poster
              </Text>
            </Center>
          )}
        </Center>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.content }} />
        </Spoiler>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
        </Spoiler>
      </td>
      <td>
        <Stack>
          <Stack align="center">
            <Button
              color={"green"}
              leftIcon={<IconEyeShare />}
              radius={"xl"}
              onClick={() => onPublish(e.id, setData)}
            >
              Publish
            </Button>
            <Button
              color={"red"}
              leftIcon={<IconBan />}
              radius={"xl"}
              onClick={() => {
                setReject(true);
                setJobId(e.id);
              }}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Center>
          <Image
            alt="Foto"
            src={RouterJob.api_gambar + img}
            mah={500}
            maw={300}
          />
        </Center>
      </Modal>

      <Modal
        opened={reject}
        onClose={() => {
          setReject(false);
        }}
        withCloseButton={false}
        size={"lg"}
        centered
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            autosize
            label="Alasan Penolakan"
            placeholder="Masukkan alasan penolakan lowongan ini"
            onChange={(val) => setCatatan(val.currentTarget.value)}
          />
          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                onReject(jobId, catatan, setData);
                setReject(false);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Box>
        <Box bg={"orange.1"} p={"xs"}>
          <Title order={6} c={"orange"}>
            REVIEW
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
                  <Center>Judul</Center>
                </th>
                <th>
                  <Center>Poster</Center>
                </th>
                <th>
                  <Center>Syarat Ketentuan</Center>
                </th>
                <th>
                  <Center>Deskripsi</Center>
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

async function onPublish(jobId: string, setData: any) {
  await AdminJob_funEditStatusPublishById(jobId).then(async (res) => {
    if (res.status === 200) {
      await AdminJob_getListTableByStatusId("2").then((res) => {
        setData(res);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Update");
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onReject(jobId: string, catatan: string, setData: any) {
  await AdminJob_funEditCatatanById(jobId, catatan).then(async (res) => {
    if (res.status === 200) {
      await AdminJob_getListTableByStatusId("2").then((val) => {
        setData(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
