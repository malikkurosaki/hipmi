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
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useAtom } from "jotai";
import { gs_vote_status } from "../../global_state";
import { useDisclosure } from "@mantine/hooks";
import { MODEL_VOTING } from "../../model/interface";
import { Vote_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";

export default function Vote_DetailReject({
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
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const [opened, { open, close }] = useDisclosure(false);

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
            onUpdate();
          }}
        >
          Edit Kembali
        </Button>{" "}
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            open();
          }}
        >
          Hapus
        </Button>
      </SimpleGrid>

      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Yakin menghapus vote ini ?</Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Kembali
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onDelete();
              }}
              color="red"
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
