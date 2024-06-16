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
import { MODEL_JOB } from "../../model/interface";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";

export default function Job_DetailReject({ dataJob }: { dataJob: MODEL_JOB }) {
  
  return (
    <>
      <Stack>
        <ComponentJob_NotedBox informasi={dataJob.catatan} />
        <ComponentJob_DetailData data={dataJob} />
        <ButtonAction jobId={dataJob.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [status, setStatus] = useAtom(gs_job_status);
  const [opened, { open, close }] = useDisclosure();

  async function onAction() {
    await Job_funEditStatusByStatusId(jobId, "3").then((res) => {
      if (res.status === 200) {
        router.push(RouterJob.status);
        setStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil("Masuk Draft");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  async function onDelete() {
    await Job_funDeleteById(jobId).then((res) => {
      if (res.status === 200) {
        router.push(RouterJob.status);
        setStatus("Reject");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Job");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
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
