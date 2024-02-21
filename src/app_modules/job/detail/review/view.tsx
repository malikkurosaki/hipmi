"use client";

import { Button, Card, Image, Skeleton, Stack, Text } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { useAtom } from "jotai";
import { gs_job_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Job_DetailReview() {
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
  async function onAction() {
    router.push(RouterJob.status);
    setStatus("Draft");
    ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
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
