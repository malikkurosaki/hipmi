"use client";

import { Button, Group, Stack } from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { useAtom } from "jotai";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { gs_event_status } from "../../global_state";
import { MODEL_EVENT } from "../../model/interface";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";

export default function Event_DetailDraft({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(dataEvent.catatan)}</pre> */}
      <Stack spacing={"lg"}>
        {dataEvent?.catatan ? (
          <ComponentGlobal_BoxInformation
            isReport
            informasi={dataEvent?.catatan}
          />
        ) : (
          ""
        )}
        <ComponentEvent_DetailData data={dataEvent} />
        <ButtonAction eventId={dataEvent?.id} tanggal={dataEvent.tanggal} />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId, tanggal }: { eventId: string; tanggal: any }) {
  const router = useRouter();
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const [isLoadingAjukan, setLoadingAjukan] = useState(false);
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  async function onDelete() {
    await Event_funDeleteById(eventId).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        setLoadingDelete(true);
        setTabsStatus("Draft");
        close();
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  async function onAjukan() {
    if (moment(tanggal.toISOString().toString()).diff(moment(), "minutes") < 0)
      return ComponentGlobal_NotifikasiPeringatan("Waktu acara telah lewat");

    const res = await Event_funEditStatusById("2", eventId);
    if (res.status === 200) {
      const dataNotif: any = {
        appId: res.data?.id as any,
        status: res.data?.EventMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "EVENT",
        title: "Mengajukan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "ADMIN",
          JSON.stringify({
            count: 1,
          })
        );
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        setTabsStatus("Review");
        setLoadingAjukan(true);
        router.back();
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            setOpenModal2(true);
          }}
        >
          Hapus
        </Button>
      </Group>

      {/* MODAL AJUKAN */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengajukan event ini?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal1(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingAjukan ? true : false}
            radius={"xl"}
            onClick={() => {
              onAjukan();
            }}
            color="yellow"
          >
            Ajukan
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus event ini?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal2(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingDelete ? true : false}
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
            color="red"
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
