"use client";

import { Button, Group, Modal, SimpleGrid, Stack, Title } from "@mantine/core";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_vote_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { useDisclosure } from "@mantine/hooks";
import { MODEL_VOTING } from "../../model/interface";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Vote_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import moment from "moment";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useState } from "react";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";

export default function Vote_DetailDraft({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        {dataVote?.catatan ? (
          <ComponentGlobal_BoxInformation
            isReport
            informasi={dataVote?.catatan}
          />
        ) : (
          ""
        )}
        <ComponentVote_DetailDataSebelumPublish data={dataVote} />
        <ButtonAction voteId={dataVote.id} awalVote={dataVote.awalVote} />
      </Stack>
    </>
  );
}

function ButtonAction({
  voteId,
  awalVote,
}: {
  voteId: string;
  awalVote: Date;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    const hariIni = new Date();
    const cekHari = moment(awalVote).diff(hariIni, "days");

    if (cekHari < 0)
      return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

    await Vote_funEditStatusByStatusId(voteId, "2").then((res) => {
      if (res.status === 200) {
        setTabsStatus("Review");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Ajukan Review", 2000);
        setIsLoading(true);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  async function onDelete() {
    await Vote_funDeleteById(voteId).then((res) => {
      if (res.status === 200) {
        setTabsStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Vote", 2000);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <Button
          radius={"xl"}
          bg={MainColor.yellow}
          color="yellow"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            setOpenModal2(true);
          }}
        >
          Hapus
        </Button>
      </SimpleGrid>

      {/* MODAL AJUKAN */}
      <UIGlobal_Modal
        title={"Anda yakin akan melakukan pengajuan review kembali ?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpenModal1(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            onClick={() => {
              onUpdate();
            }}
            color="yellow"
            bg={MainColor.yellow}
          >
            Ajukan
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin menghapus voting ini ?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpenModal2(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
            color="red"
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
