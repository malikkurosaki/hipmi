"use client";

import { Button, Card, Image, Skeleton, Stack, Text } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { useAtom } from "jotai";
import { gs_job_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { MODEL_JOB } from "../../model/interface";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";


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

  async function onAction() {
    await Job_funEditStatusByStatusId(jobId, "3").then((res) => {
      if (res.status === 200) {
        setStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
        router.push(RouterJob.status);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Button
        radius={"xl"}
        color="red"
        mb={50}
        onClick={() => {
          onAction();
        }}
      >
        Batalkan Review
      </Button>
    </>
  );
}
