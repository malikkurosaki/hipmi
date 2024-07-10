"use client";

import { Button, Card, Image, Skeleton, Stack, Text } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { useAtom } from "jotai";
import { gs_job_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { MODEL_JOB } from "../../model/interface";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Job_DetailReview({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={dataJob} />
        <ButtonAction jobId={dataJob.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [status, setStatus] = useAtom(gs_job_status);
  const [opened, { open, close }] = useDisclosure();
  const [isOpen, setOpen] = useState(false);

  async function onAction() {
    const update = await Job_funEditStatusByStatusId(jobId, "3");
    if (update.status === 200) {
      const dataNotif = {
        appId: update.data?.id as any,
        kategoriApp: "JOB",
        status: update.data?.MasterStatus?.name as any,
        userId: update.data?.authorId as any,
        pesan: update.data?.title as any,
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      }

      setStatus("Draft");
      ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
      router.push(RouterJob.status);
    } else {
      ComponentGlobal_NotifikasiGagal(update.message);
    }
  }
  return (
    <>
      <UIGlobal_Modal
        opened={isOpen}
        close={() => setOpen(false)}
        title={"Anda yakin membatalkan review ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color="orange"
            onClick={() => {
              onAction();
            }}
          >
            Simpan
          </Button>
        }
      />

      <Button
        radius={"xl"}
        color="orange"
        my={"xl"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Batalkan Review
      </Button>
    </>
  );
}
