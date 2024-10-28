"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, Group, Paper, Spoiler, Stack, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funDeleteDonasiById } from "../../fun/delete/fin_delete_donasi_by_id";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";

export default function DetailRejectDonasi({
  dataReject,
  fileIdImageCerita,
}: {
  dataReject: MODEL_DONASI;
  fileIdImageCerita: string;
}) {
  const [data, setData] = useState(dataReject);
  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentGlobal_BoxInformation isReport informasi={data.catatan} />
        <ComponentDonasi_DetailDataGalangDana donasi={data} />
        <ComponentDonasi_CeritaPenggalangMain donasi={data} />
        <ButtonAction
          donasiId={data.id}
          fileIdImageCerita={fileIdImageCerita}
          imageId={data.imageId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  donasiId,
  fileIdImageCerita,
  imageId,
}: {
  donasiId: string;
  fileIdImageCerita: string;
  imageId: string;
}) {
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const router = useRouter();
  // const [opened, { open, close }] = useDisclosure(false);
  const [openModal, setOpenModal] = useState(false);

  async function onCLick() {
    await Donasi_funGantiStatus(donasiId, "3").then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterDonasi.main_galang_dana);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
    setTabsPostingDonasi("Draft");
  }
  async function onDelete() {
    const del = await Donasi_funDeleteDonasiById(donasiId);
    if (del.status === 200) {
      const deleteImageDonasi = await funGlobal_DeleteFileById({
        fileId: imageId as any,
      });

      if (!deleteImageDonasi.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      const deleteImageCerita = await funGlobal_DeleteFileById({
        fileId: fileIdImageCerita as any,
      });

      if (!deleteImageCerita.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      router.push(RouterDonasi.main_galang_dana);
      setTabsPostingDonasi("Reject");
      ComponentGlobal_NotifikasiBerhasil(del.message);
    } else {
      ComponentGlobal_NotifikasiGagal(del.message);
    }
  }
  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          bg={"orange"}
          color="orange"
          onClick={() => onCLick()}
        >
          Edit Donasi
        </Button>
        <Button
          radius={"xl"}
          bg={"red"}
          color="red"
          onClick={() => setOpenModal(true)}
        >
          Hapus Donasi
        </Button>
      </Group>

      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus donasi ini ?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button radius={"xl"} color="red" onClick={() => onDelete()}>
            Hapus
          </Button>
        }
      />
    </>
  );
}
