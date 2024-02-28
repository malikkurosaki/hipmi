"use client";

import { Button, Stack } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { useAtom } from "jotai";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { gs_job_status, gs_job_hot_menu } from "../../global_state";

export default function Job_DetailArsip({ dataJob }: { dataJob: MODEL_JOB }) {
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
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);

  async function onAction() {
    await Job_funEditArsipById(jobId, false).then((res) => {
      if (res.status === 200) {
        setStatus("Publish");
        setHotMenu(1);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Diarsipkan");
        router.replace(RouterJob.beranda);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Button
        radius={"xl"}
        color="green"
        mb={30}
        onClick={() => {
          onAction();
        }}
      >
        Publish Lagi
      </Button>
    </>
  );
}
