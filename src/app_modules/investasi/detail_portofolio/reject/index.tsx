"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, Group, Stack } from "@mantine/core";
import { IconBookDownload, IconFileDescription } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentInvestasi_DetailDataNonPublish } from "../../component/detail/detai_data_non_publish";
import funDeleteInvestasi from "../../fun/fun_delete_investasi";
import funGantiStatusInvestasi from "../../fun/fun_ganti_status";
import { gs_StatusPortoInvestasi } from "../../g_state";
import { MODEL_Investasi } from "../../model/model_investasi";

export default function DetailRejectInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [openModal, setOpenModal] = useState(false);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.edit_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.edit_dokumen,
    },
    // {
    //   id: 3,
    //   name: "Berita",
    //   icon: <IconSpeakerphone size={70} />,
    //   route: RouterInvestasi.edit_berita,
    // },
  ];

  async function onAjukan() {
    await funGantiStatusInvestasi(investasi.id, "1").then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Project Diajukan Kembali");
        setActiveTab("Draft");
        router.push(RouterInvestasi.portofolio);
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal Pengajuan");
      }
    });
  }

  async function onDelete() {
    await funDeleteInvestasi(investasi.id).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setOpenModal(false);
        router.push(RouterInvestasi.portofolio);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
    // setActiveTab("Reject");
  }

  return (
    <>
      {/* Pop up */}

      <UIGlobal_Modal
        title={"Anda Yakin Menghapus Data?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button bg={"red"} radius={"xl"} onClick={() => onDelete()}>
            Hapus
          </Button>
        }
      />

      <Stack>
        {/* Alasan */}
        <ComponentGlobal_BoxInformation
          informasi={investasi.catatan}
          isReport
        />

        <ComponentInvestasi_DetailDataNonPublish data={investasi} />

        <Group position="apart" grow>
          {/* Tombol Ajukan */}
          <Button
            mb={"xl"}
            radius={50}
            bg={"orange.7"}
            color="yellow"
            onClick={() => onAjukan()}
          >
            Edit Kembali
          </Button>

          {/* Tombol Hapus */}
          <Button
            mb={"xl"}
            radius={50}
            bg={"red.7"}
            color="yellow"
            onClick={() => setOpenModal(true)}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}
