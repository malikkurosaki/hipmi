"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useDisclosure } from "@mantine/hooks";

export default function Event_DetailReject() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentEvent_DetailData />
        <SimpleGrid cols={2}>
          <Button
            w={"100%"}
            radius={"xl"}
            color="yellow"
            onClick={() => onUpdate(router, setTabsStatus)}
          >
            Edit Kembali
          </Button>
          <Button w={"100%"} radius={"xl"} color="red" onClick={() => open()}>
            Hapus
          </Button>
        </SimpleGrid>
      </Stack>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Yakin akan menghapus event ini?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button radius={"xl"} onClick={() => onDelete(router)} color="red">
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

async function onUpdate(router: AppRouterInstance, setTabsStatus: any) {
  ComponentGlobal_NotifikasiBerhasil("Silahkan Edit Kembali");
  setTabsStatus("Draft");
  router.back();
}

async function onDelete(router: AppRouterInstance) {
  ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Event");
  router.back();
}
