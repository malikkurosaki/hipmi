"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { gs_vote_status } from "../../global_state";
import ComponentVote_DetailData from "../../component/detail/detail_data";

export default function Vote_DetailReview() {
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentVote_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  async function onUpdate() {
    setTabsStatus("Draft");
    ComponentGlobal_NotifikasiBerhasil("Berhasil Batalkan Review", 2000);
    router.back();
  }
  return (
    <>
      <Button
        radius={"xl"}
        color="red"
        onClick={() => {
          onUpdate();
        }}
      >
        Batalkan Review
      </Button>
    </>
  );
}
