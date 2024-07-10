"use client";

import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import { gs_colab_status } from "@/app_modules/colab/global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function Colab_DetailStatusReview() {
  return (
    <>
      <Stack px={"xs"} spacing={"xl"}>
        <ComponentColab_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_colab_status);

  async function onClick() {
    setTabsStatus("Reject");
    router.back();
    ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
  }

  return (
    <>
      <Button radius={"xl"} onClick={() => onClick()}>
        Batalkan Review
      </Button>
    </>
  );
}
