"use client";

import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { useAtom } from "jotai";
import { gs_vote_status } from "../../global_state";
import { useDisclosure } from "@mantine/hooks";
import { MODEL_VOTING } from "../../model/interface";
import { Vote_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import ComponentVote_NotedBox from "../../component/noted_box";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { useState } from "react";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Vote_DetailReject({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentGlobal_BoxInformation
          isReport
          informasi={dataVote?.catatan}
        />
        <ComponentVote_DetailDataSebelumPublish data={dataVote as any} />
        <ButtonAction voteId={dataVote.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ voteId }: { voteId: string }) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    await Vote_funEditStatusByStatusId(voteId, "3").then((res) => {
      if (res.status === 200) {
        setTabsStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Masuk Draft", 2000);
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
          color="orange"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Edit Kembali
        </Button>{" "}
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

      <UIGlobal_Modal
        title={"Anda akan mengedit kembali voting ini ?"}
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
            color="orange"
          >
            Simpan
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
