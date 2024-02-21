"use client";

import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_job_hot_menu, gs_job_status } from "../../global_state";

export default function Job_DetailPublish() {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [status, setStatus] = useAtom(gs_job_status);
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu)
  async function onAction() {
    router.push(RouterJob.arsip);
    setStatus("Publish");
    setHotMenu(3)
    ComponentGlobal_NotifikasiBerhasil("Berhasil Diarsipkan");
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
