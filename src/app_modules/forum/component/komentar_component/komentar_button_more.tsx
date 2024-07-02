"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Drawer,
  Stack,
  Grid,
  Button,
  Modal,
  Title,
  Group,
  ActionIcon,
  Text,
  Box,
  Center,
  Loader,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconTrash, IconEdit, IconFlag3, IconDots } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createStyles } from "@mantine/core";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../../global_state";
import ComponentForum_LoadingDrawer from "../loading_drawer";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { forum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { forum_funDeleteKomentarById } from "../../fun/delete/fun_delete_komentar_by_id";
import { forum_funGetAllKomentarById } from "../../fun/get/get_all_komentar_by_id";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";

export default function ComponentForum_KomentarButtonMore({
  userId,
  komentarId,
  setKomentar,
  postingId,
  userLoginId,
}: {
  userId: any;
  komentarId: any;
  setKomentar?: any;
  postingId?: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [openDel, setOpenDel] = useState(false);

  // loading
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  return (
    <>
      <Drawer
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            borderTop: `1px solid ${AccentColor.blue}`,
            borderRadius: "10px 10px 0px 0px",
          },
          header: {
            borderRadius: "10px 10px 0px 0px",
          },
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.1, blur: 1 }}
        position="bottom"
        size={"auto"}
      >
        <Stack>
          {userLoginId == userId ? (
            <Stack>
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
            </Stack>
          ) : (
            <Grid
              onClick={() => {
                setLoadingReport(true);
                router.push(RouterForum.report_komentar + komentarId);
              }}
            >
              <Grid.Col span={"content"}>
                <IconFlag3 color={loadingReport ? "gray" : "white"} />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Group>
                  <Text c={loadingReport ? "gray" : "white"}>
                    Laporkan komentar
                  </Text>{" "}
                  {loadingReport ? <Loader size={"sm"} /> : ""}
                </Group>
              </Grid.Col>
            </Grid>
          )}

          <Button
            bg={MainColor.yellow}
            color={"yellow"}
            style={{
              border: `1px solid ${AccentColor.yellow}`,
            }}
            radius={"xl"}
            onClick={close}
          >
            Batal
          </Button>
        </Stack>
      </Drawer>

      <Modal
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `1px solid ${AccentColor.blue}`,
          },
        }}
        opened={openDel}
        onClose={() => {
          setOpenDel(false);
        }}
        centered
        withCloseButton={false}
      >
        <ButtonDelete
          komentarId={komentarId}
          setOpenDel={setOpenDel}
          setKomentar={setKomentar}
          postingId={postingId}
        />
      </Modal>

      <ActionIcon c={"white"} variant="transparent" onClick={() => open()}>
        <IconDots size={20} />
      </ActionIcon>
    </>
  );
}

function ButtonDelete({
  komentarId,
  setOpenDel,
  setKomentar,
  postingId,
}: {
  komentarId?: string;
  setOpenDel: any;
  setKomentar?: any;
  postingId?: string;
}) {
  const [loading, setLoading] = useState(false);

  if (loading) return <ComponentGlobal_V2_LoadingPage />;

  async function onDelete() {
    await forum_funDeleteKomentarById(komentarId as any).then(async (res) => {
      if (res.status === 200) {
        await forum_funGetAllKomentarById(postingId as any).then((val) => {
          setKomentar(val);
          setOpenDel(false);
          setLoading(true);
          ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Stack>
        <Title order={6} c="white">Yakin menghapus komentar ini ?</Title>
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
