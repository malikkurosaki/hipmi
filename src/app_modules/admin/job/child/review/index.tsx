"use client";

import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import mqtt_client from "@/util/mqtt_client";
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
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBan,
  IconEyeCheck,
  IconEyeShare,
  IconHandFinger,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";
import { AdminJob_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import adminJob_getListReview from "../../fun/get/get_list_review";
import { IconPhotoCheck } from "@tabler/icons-react";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";

export default function AdminJob_TableReview({
  dataReview,
}: {
  dataReview: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <TableStatus listReview={dataReview} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_JOB[]>(listReview.data);
  const [nPage, setNPage] = useState(listReview.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [reject, setReject] = useState(false);
  const [jobId, setJobId] = useState("");
  const [catatan, setCatatan] = useState("");

  useShallowEffect(() => {
    onLoadData({
      onSuccessLoad(val) {
        setData(val.data);
        setNPage(val.nPage);
      },
    });
  }, [setData, setNPage]);

  async function onLoadData({
    onSuccessLoad,
  }: {
    onSuccessLoad: (val: any) => any;
  }) {
    const loadData = await adminJob_getListReview({ page: 1 });
    onSuccessLoad(loadData);
  }

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1)
    const loadData = await adminJob_getListReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminJob_getListReview({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const rowTable = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={150}>
          <Text>{e?.Author?.username}</Text>
        </Center>
      </td>
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
        <Center w={200}>
          {e.imagesId ? (
            <Button
              color="green"
              radius={"xl"}
              leftIcon={<IconPhotoCheck />}
              onClick={() => {
                router.push(RouterAdminJob.detail_poster + e?.imagesId);
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
              onClick={() =>
                onPublish({
                  jobId: e?.id,
                  onLoadData(val: any) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                })
              }
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
      <Modal
        opened={reject}
        onClose={() => {
          setReject(false);
        }}
        withCloseButton={false}
        size={"sm"}
        centered
      >
        <Stack>
          <Stack spacing={5}>
            <Textarea
              minRows={2}
              maxRows={5}
              maxLength={300}
              autosize
              label={<Text fw={"bold"}>Alasan Penolakan</Text>}
              placeholder="Masukkan alasan penolakan lowongan ini"
              onChange={(val) => setCatatan(val.currentTarget.value)}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={catatan.length}
            />
          </Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={() => setReject(false)}>
              Batal
            </Button>
            <Button
              style={{ transition: "0.5s" }}
              disabled={catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject({
                  jobId: jobId,
                  catatan: catatan,
                  onLoadData(val) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                });
                setReject(false);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Review
          </Title>
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
              w={"100%"}
              h={"100%"}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Author</Center>
                  </th>
                  <th>
                    <Text>Judul</Text>
                  </th>
                  <th>
                    <Center>Poster</Center>
                  </th>
                  <th>
                    <Text>Syarat Ketentuan</Text>
                  </th>
                  <th>
                    <Text>Deskripsi</Text>
                  </th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
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
      </Stack>
    </>
  );
}

async function onPublish({
  jobId,
  onLoadData,
}: {
  jobId: string;
  onLoadData: (val: any) => void;
}) {
  const publish = await AdminJob_funEditStatusPublishById(jobId);
  if (publish.status === 200) {
    const loadData = await adminJob_getListReview({ page: 1 });
    onLoadData(loadData);

    const dataNotif = {
      appId: publish.data?.id as any,
      status: publish.data?.MasterStatus?.name as any,
      userId: publish.data?.authorId as any,
      pesan: publish.data?.title as any,
      kategoriApp: "JOB",
      title: "Job publish",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotif as any,
    });

    if (notif.status === 201) {
      mqtt_client.publish(
        "USER",
        JSON.stringify({ userId: publish?.data?.authorId, count: 1 })
      );
    }

    ComponentGlobal_NotifikasiBerhasil(publish.message);
  } else {
    ComponentGlobal_NotifikasiGagal(publish.message);
  }
}

async function onReject({
  jobId,
  catatan,
  onLoadData,
}: {
  jobId: string;
  catatan: string;
  onLoadData: (val: any) => void;
}) {
  const reject = await AdminJob_funEditCatatanById(jobId, catatan);

  if (reject.status === 200) {
    const loadData = await adminJob_getListReview({ page: 1 });
    onLoadData(loadData);

    ComponentGlobal_NotifikasiBerhasil(reject.message);

    const dataNotif = {
      appId: reject.data?.id as any,
      status: reject.data?.MasterStatus?.name as any,
      userId: reject.data?.authorId as any,
      pesan: reject.data?.title as any,
      kategoriApp: "JOB",
      title: "Job anda ditolak !",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotif as any,
    });

    if (notif.status === 201) {
      mqtt_client.publish(
        "USER",
        JSON.stringify({ userId: dataNotif.userId, count: 1 })
      );
    }
  } else {
    ComponentGlobal_NotifikasiGagal(reject.message);
  }
}
