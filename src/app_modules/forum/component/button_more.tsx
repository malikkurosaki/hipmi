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
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconEdit, IconFlag3, IconDots } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createStyles } from "@mantine/core";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../global_state";
import ComponentForum_LoadingDrawer from "./loading_drawer";

const useStyles = createStyles((theme) => ({
  myCustomButton: {
    ...theme.fn.focusStyles(),
  },
  radiusCustom: {
    // borderRadius: "10px, 10px, 0px,0px",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
  },
}));

export default function ButtonMore({ id, tipe }: { id: any; tipe: string }) {
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [openDel, setOpenDel] = useState(false);

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
              if (tipe === "posting") {
                router.push(RouterForum.edit_posting + id);
              } else {
                router.push(RouterForum.edit_komentar + id);
              }
            }}
          >
            <Grid.Col span={"content"}>
              <IconEdit color={loadingEdit ? "gray" : "black"} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Group>
                <Text c={loadingEdit ? "gray" : "black"}>Edit {tipe}</Text>{" "}
                {loadingEdit ? <Loader size={"sm"} /> : ""}
              </Group>
            </Grid.Col>
          </Grid>

          <Grid
            onClick={() => {
              setLoadingReport(true);
              if (tipe === "posting") {
                router.push(RouterForum.report_posting + id);
              } else {
                router.push(RouterForum.report_komentar + id);
              }
            }}
          >
            <Grid.Col span={"content"}>
              <IconFlag3 color={loadingReport ? "gray" : "black"} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Group>
                <Text c={loadingReport ? "gray" : "black"}>
                  Laporkan {tipe}
                </Text>{" "}
                {loadingReport ? <Loader size={"sm"} /> : ""}
              </Group>
            </Grid.Col>
          </Grid>

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
        <Stack>
          <Title order={6}>Yakin menghapus {tipe} ini ?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => setOpenDel(false)}>
              Batal
            </Button>
            <Button
              color="red"
              radius={"xl"}
              onClick={() => {
                setOpenDel(false);
                if (tipe === "posting") {
                  ComponentGlobal_NotifikasiBerhasil(
                    "Postingan Terhapus ",
                    2000
                  );
                } else {
                  ComponentGlobal_NotifikasiBerhasil(
                    "Berhasil Hapus Komentar",
                    2000
                  );
                }
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>

      <ActionIcon variant="transparent" onClick={() => open()}>
        <IconDots size={20} />
      </ActionIcon>
    </>
  );
}
