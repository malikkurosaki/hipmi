"use client";

import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
  UIGlobal_DrawerCustom,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
  UIGlobal_Modal
} from "@/app_modules/_global/ui";
import { ActionIcon, Button, Center, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funDeleteBerita } from "../../_fun";
import { Investasi_ViewDetailBerita } from "../../_view";

export function Investasi_UiDetailBerita({ dataBerita }: { dataBerita: any }) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(dataBerita);

  async function onDelete() {
    const del = await investasi_funDeleteBerita({
      beritaId: dataBerita.id,
    });

    if (del.status === 200) {
      const deleteImage = await funGlobal_DeleteFileById({
        fileId: data.imageId,
      });

      if (!deleteImage.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      ComponentGlobal_NotifikasiBerhasil(del.message);
      setOpenModal(false);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(del.message);
    }
  }

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Berita"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        <Investasi_ViewDetailBerita dataBerita={data} />
      </UIGlobal_LayoutTamplate>

      <UIGlobal_DrawerCustom
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={
          <Center>
            <Stack
              align="center"
              spacing={"xs"}
              onClick={() => {
                setOpenDrawer(false);
                setOpenModal(true);
              }}
            >
              <ActionIcon variant="transparent">
                <IconTrash color="red" />
              </ActionIcon>
              <Text c={"red"}>Hapus berita</Text>
            </Stack>
          </Center>
        }
      />

      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={"Anda yakin ingin menghapus berita ini ?"}
        buttonKiri={
          <Button radius="xl" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius="xl"
            color="red"
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
