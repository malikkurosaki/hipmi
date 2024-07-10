"use client";

import ComponentColab_NotedBox from "@/app_modules/colab/component/noted_box";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import { Button, Group, Modal, Stack, Title } from "@mantine/core";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { gs_colab_status } from "@/app_modules/colab/global_state";
import { useAtom } from "jotai";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { useDisclosure } from "@mantine/hooks";

export default function Colab_DetailStatusReject() {
  return (
    <>
      <Stack px={"xs"} spacing={"xl"}>
        <ComponentColab_NotedBox informasi="Alasan penolakan" />
        <ComponentColab_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_colab_status);
  const [opened, { open, close }] = useDisclosure(false);

  async function onAjukan() {
    setTabsStatus("Review");
    ComponentGlobal_NotifikasiBerhasil("Ajukan Review Berhasil");
    router.back();
  }

  async function onDelete() {
    router.back();
    ComponentGlobal_NotifikasiBerhasil("Berhasil Dihapus");
  }

  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          leftIcon={<IconCheck size={15} />}
          onClick={() => onAjukan()}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          leftIcon={<IconTrash size={15} />}
          color="red"
          onClick={() => open()}
        >
          Hapus
        </Button>
      </Group>

      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Yakin menghapus proyek ini ?</Title>
          <Group position="center">
            <Button
              radius={"xl"}
              leftIcon={<IconX size={15} />}
              onClick={close}
            >
              Batal
            </Button>
            <Button
              radius={"xl"}
              leftIcon={<IconTrash size={15} />}
              color="red"
              onClick={() => onDelete()}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
