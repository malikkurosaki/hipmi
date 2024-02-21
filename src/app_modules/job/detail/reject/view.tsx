"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button, Group, Modal, Paper, Title } from "@mantine/core";
import { useAtom } from "jotai";

import ComponentJob_DetailData from "../../component/detail/detail_data";
import { gs_job_status } from "../../global_state";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import ComponentJob_NotedBox from "../../component/detail/noted_box";

export default function Job_DetailReject() {
  return (
    <>
      <Stack>
        <ComponentJob_NotedBox informasi="Alasan reject"/>
        <ComponentJob_DetailData />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [status, setStatus] = useAtom(gs_job_status);
  const [opened, { open, close }] = useDisclosure();

  async function onAction() {
    router.push(RouterJob.status);
    setStatus("Draft");
    ComponentGlobal_NotifikasiBerhasil("Masuk Draft");
  }

  async function onDelete() {
    router.push(RouterJob.status);
    setStatus("Reject");
    ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Job");
  }

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Paper px={"lg"}>
          <Stack>
            <Title order={6}>Yakin ingin menghapus ini ?</Title>
            <Group grow>
              <Button
                radius={"xl"}
                onClick={() => {
                  close();
                }}
              >
                Batal
              </Button>
              <Button
                radius={"xl"}
                color="red"
                onClick={() => {
                  onDelete();
                }}
              >
                Hapus
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>

      <Group grow mb={50}>
        <Button
          radius={"xl"}
          color="orange"
          onClick={() => {
            onAction();
          }}
        >
          Edit Kembali
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
      </Group>
    </>
  );
}
