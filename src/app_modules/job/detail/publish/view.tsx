"use client";

import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_job_hot_menu, gs_job_status } from "../../global_state";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { MODEL_JOB } from "../../model/interface";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Job_DetailPublish({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={dataJob as any} />
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
    await Job_funEditArsipById(jobId, true).then((res) => {
      if (res.status === 200) {
        setStatus("Publish");
        setHotMenu(3);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Diarsipkan");
        router.replace(RouterJob.arsip);
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
        Arsipkan
      </Button>
    </>
  );
}
