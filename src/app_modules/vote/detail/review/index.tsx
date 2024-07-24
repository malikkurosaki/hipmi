"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { gs_vote_status } from "../../global_state";
import { MODEL_VOTING } from "../../model/interface";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import mqtt_client from "@/util/mqtt_client";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";

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
  const [openModal, setOpenModal] = useState(false);

  async function onUpdate() {
    const res = await Vote_funEditStatusByStatusId(voteId, "3");
    if (res.status === 200) {
      const dataNotif: any = {
        appId: res.data?.id as any,
        status: res.data?.Voting_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "VOTING",
        title: "Membatalkan review",
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
        setTabsStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Batalkan Review", 2000);
        router.back();
        setIsLoading(true);
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }
  return (
    <>
      <Button
        radius={"xl"}
        color="orange"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin akan membatalkan review?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            color="green"
            onClick={() => onUpdate()}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
