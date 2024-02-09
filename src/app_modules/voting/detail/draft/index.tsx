"use client";

import { Button, Group, Modal, SimpleGrid, Stack, Title } from "@mantine/core";
import ComponentVote_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_vote_status } from "../../global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useDisclosure } from "@mantine/hooks";

export default function Vote_DetailDraft() {
  return (
    <>
      <Stack>
        <ComponentVote_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const [opened, { open, close }] = useDisclosure(false);

  async function onUpdate() {
    setTabsStatus("Review");
    ComponentGlobal_NotifikasiBerhasil("Berhasil Ajukan Review", 2000);
    router.back();
  }

  async function onDelete() {
    setTabsStatus("Draft");
    ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Vote", 2000);
    router.back();
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            onUpdate();
          }}
        >
          Ajukan Review
        </Button>
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
