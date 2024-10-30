"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";

export default function DetailReviewDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataDonasi);

  return (
    <>
      <Stack spacing={"xl"} pb={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={donasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
        <ButtonBatalReview donasi={donasi} />
      </Stack>
    </>
  );
}
function ButtonBatalReview({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function onChangeStatus() {
    const res = await Donasi_funGantiStatus(donasi.id, "3");
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id as any,
        status: res.data?.DonasiMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "DONASI",
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));

        ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
        setLoading(true);
        router.push(RouterDonasi.status_galang_dana({ id: "3" }));
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  }
  return (
    <>
      <Button
        mt={"lg"}
        style={{
          transition: "0.5s",
        }}
        radius={"xl"}
        bg={"orange"}
        color="orange"
        onClick={() => setOpenModal(true)}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin batalkan review ?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            color="orange"
            onClick={() => {
              onChangeStatus();
            }}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
