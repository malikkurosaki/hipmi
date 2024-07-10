"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
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
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_VOTING } from "../../model/interface";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useState } from "react";

export default function Vote_DetailReview({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentVote_DetailDataSebelumPublish data={dataVote as any} />
        <ButtonAction voteId={dataVote.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ voteId }: { voteId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  async function onUpdate() {
    await Vote_funEditStatusByStatusId(voteId, "3").then((res) => {
      if (res.status === 200) {
        setTabsStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Batalkan Review", 2000);
        router.back();
        setIsLoading(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading ? true : false}
        radius={"xl"}
        color="orange"
        onClick={() => {8
          onUpdate();
        }}
      >
        Batalkan Review
      </Button>
    </>
  );
}
