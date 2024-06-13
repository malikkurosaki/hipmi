"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  ActionIcon,
  Button,
  Drawer,
  Grid,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconEdit,
  IconFlag3,
  IconSquareCheck,
  IconSquareRoundedX,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { forum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { forum_funEditStatusPostingById } from "../../fun/edit/fun_edit_status_posting_by_id";
import { forum_getListAllPosting } from "../../fun/get/get_list_all_posting";
import { forum_new_getAllPosting } from "../../fun/get/new_get_all_posting";
import forum_v2_getAllPosting from "../../fun/get/v2_get_all_posting";

export default function ComponentForum_V2_CardMoreButton({
  authorId,
  postingId,
  statusId,
  userLoginId,
  onLoadData,
}: {
  authorId: any;
  postingId?: any;
  statusId?: any;
  userLoginId: any;
  onLoadData: (val: any) => void;
}) {
  const router = useRouter();

  // modal & drawer
  const [opened, { open, close }] = useDisclosure(false);
  const [openDel, setOpenDel] = useState(false);
  const [openStatusClose, setOpenStatusClose] = useState(false);

  // loading
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  //   if (loadingEdit) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      <Drawer
        // className={classes.radiusCustom}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.1, blur: 1 }}
        position="bottom"
        size={"auto"}
      >
        <Stack>
          {userLoginId != authorId ? (
            ""
          ) : (
            <Stack>
              <Grid
                onClick={() => {
                  close();
                  setOpenStatusClose(true);
                }}
              >
                <Grid.Col span={"content"}>
                  {statusId === 1 ? (
                    <IconSquareRoundedX color="red" />
                  ) : (
                    <IconSquareCheck />
                  )}
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  {statusId === 1 ? (
                    <Text c={"red"}>Tutup forum</Text>
                  ) : (
                    <Text>Buka forum</Text>
                  )}
                </Grid.Col>
              </Grid>

              <Grid
                onClick={() => {
                  close();
                  setOpenDel(true);
                }}
              >
                <Grid.Col span={"content"}>
                  <IconTrash color="red" />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={"red"}>Hapus</Text>
                </Grid.Col>
              </Grid>

              <Grid
                onClick={() => {
                  setLoadingEdit(true);
                  router.push(RouterForum.edit_posting + postingId);
                }}
              >
                <Grid.Col span={"content"}>
                  <IconEdit color={loadingEdit ? "gray" : "black"} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Group>
                    <Text c={loadingEdit ? "gray" : "black"}>Edit posting</Text>{" "}
                    {loadingEdit ? <Loader size={"sm"} /> : ""}
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          {userLoginId == authorId ? (
            ""
          ) : (
            <Grid
              onClick={() => {
                setLoadingReport(true);
                router.push(RouterForum.report_posting + postingId);
              }}
            >
              <Grid.Col span={"content"}>
                <IconFlag3 color={loadingReport ? "gray" : "black"} />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Group>
                  <Text c={loadingReport ? "gray" : "black"}>
                    Laporkan posting
                  </Text>{" "}
                  {loadingReport ? <Loader size={"sm"} /> : ""}
                </Group>
              </Grid.Col>
            </Grid>
          )}

          <Button variant="outline" radius={"xl"} onClick={close}>
            Batal
          </Button>
        </Stack>
      </Drawer>

      <Modal
        opened={openDel}
        onClose={() => {
          setOpenDel(false);
        }}
        centered
        withCloseButton={false}
      >
        <ButtonDelete
          postingId={postingId}
          setOpenDel={setOpenDel}
          onLoadData={onLoadData}
        />
      </Modal>

      <Modal
        opened={openStatusClose}
        onClose={() => setOpenStatusClose(false)}
        centered
        withCloseButton={false}
      >
        <ButtonStatus
          postingId={postingId}
          setOpenStatus={setOpenStatusClose}
          statusId={statusId}
          onLoadData={onLoadData}
          userLoginId={userLoginId}
          authorId={authorId}
        />
      </Modal>

      <ActionIcon variant="transparent" onClick={() => open()}>
        <IconDots size={20} />
      </ActionIcon>
    </>
  );
}

function ButtonDelete({
  postingId,
  setOpenDel,
  onLoadData,
}: {
  postingId?: string;
  setOpenDel: any;
  onLoadData: (val: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setOpenDel(false);
    await forum_funDeletePostingById(postingId as any).then(async (res) => {
      if (res.status === 200) {
        // ComponentGlobal_NotifikasiBerhasil(`Postingan Terhapus`, 2000);
        setLoading(true);
        const loadData = await forum_new_getAllPosting({ page: 1 });
        onLoadData(loadData);
        return null;
      } else {
        // ComponentGlobal_NotifikasiGagal(res.message);
        return null;
      }
    });
  }
  return (
    <>
      <Stack>
        <Title order={6}>Yakin menghapus posting ini ?</Title>
        <Group position="center">
          <Button radius={"xl"} onClick={() => setOpenDel(false)}>
            Batal
          </Button>
          <Button
            loaderPosition="center"
            loading={loading ? true : false}
            color="red"
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}

function ButtonStatus({
  postingId,
  setOpenStatus,
  statusId,
  onLoadData,
  userLoginId,
  authorId,
}: {
  postingId?: string;
  setOpenStatus: any;
  statusId?: any;
  onLoadData: (val: any) => void;
  userLoginId: string;
  authorId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function onTutupForum() {
    setOpenStatus(false);

    const upateStatusClose = await forum_funEditStatusPostingById(
      postingId as any,
      2
    );
    if (upateStatusClose.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(`Forum Ditutup`, 2000);

      const loadData = await forum_v2_getAllPosting({})
      onLoadData(loadData);
      setLoading(true);

    } else {
       ComponentGlobal_NotifikasiGagal(upateStatusClose.message);

    }

  }

  async function onBukaForum() {
    setOpenStatus(false);

    await forum_funEditStatusPostingById(postingId as any, 1).then(
      async (res) => {
        if (res.status === 200) {
          const loadData = await forum_v2_getAllPosting({});
          onLoadData(loadData);

          ComponentGlobal_NotifikasiBerhasil(`Forum Dibuka`, 2000);
          setLoading(true);

        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  return (
    <>
      <Stack>
        {statusId === 1 ? (
          <Title order={6}>Yakin menutup forum ini ?</Title>
        ) : (
          <Title order={6}>Yakin membuka forum ini ?</Title>
        )}
        <Group position="center">
          <Button radius={"xl"} onClick={() => setOpenStatus(false)}>
            Batal
          </Button>

          {statusId === 1 ? (
            <Button
              loaderPosition="center"
              loading={loading ? true : false}
              color="orange"
              radius={"xl"}
              onClick={() => {
                onTutupForum();
              }}
            >
              Tutup
            </Button>
          ) : (
            <Button
              loaderPosition="center"
              loading={loading ? true : false}
              color="green"
              radius={"xl"}
              onClick={() => {
                onBukaForum();
              }}
            >
              Buka
            </Button>
          )}
        </Group>
      </Stack>
    </>
  );
}
