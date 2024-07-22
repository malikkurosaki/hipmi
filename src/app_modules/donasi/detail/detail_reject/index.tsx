"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Button,
  Group,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import { Donasi_funDeleteDonasiById } from "../../fun/delete/fin_delete_donasi_by_id";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";

export default function DetailRejectDonasi({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataReject);
  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentGlobal_BoxInformation isReport informasi={donasi.catatan} />
        <ComponentDonasi_DetailDataGalangDana donasi={donasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
        <ButtonAction donasiId={donasi.id} />
      </Stack>
    </>
  );
}

function AlasanPenolakan({ catatan }: { catatan: string }) {
  return (
    <>
      <Paper bg={"blue.1"} p={"sm"}>
        <Title order={5}>Alasan penolakan</Title>
        <Spoiler
          maxHeight={50}
          hideLabel="Sembunyikan"
          showLabel="Selengkapnya"
        >
          {catatan}
        </Spoiler>
      </Paper>
    </>
  );
}

function ButtonAction({ donasiId }: { donasiId: string }) {
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  const router = useRouter();
  // const [opened, { open, close }] = useDisclosure(false);
  const [openModal, setOpenModal] = useState(false);

  async function onCLick() {
    await Donasi_funGantiStatus(donasiId, "3").then((res) => {
      if (res.status === 200) {
        NotifBerhasil(res.message);
        router.push(RouterDonasi.main_galang_dana);
      } else {
        NotifGagal(res.message);
      }
    });
    setTabsPostingDonasi("Draft");
  }
  async function onDelete() {
    await Donasi_funDeleteDonasiById(donasiId).then((res) => {
      if (res.status === 200) {
        router.push(RouterDonasi.main_galang_dana);
        setTabsPostingDonasi("Reject");
        NotifBerhasil(res.message);
      } else {
        NotifGagal(res.message);
      }
    });
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
