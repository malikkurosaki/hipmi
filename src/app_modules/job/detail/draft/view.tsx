"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, Button, Group, Modal, Paper, Title } from "@mantine/core";
import { useAtom } from "jotai";

import ComponentJob_DetailData from "../../component/detail/detail_data";
import { gs_job_status } from "../../global_state";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import ComponentJob_NotedBox from "../../component/detail/noted_box";
import { MODEL_JOB } from "../../model/interface";
import mqtt_client from "@/util/mqtt_client";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";

export default function Job_DetailDraft({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        {dataJob.catatan ? (
          <ComponentJob_NotedBox informasi={dataJob.catatan} />
        ) : (
          ""
        )}
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
    const update = await Job_funEditStatusByStatusId(jobId, "2");
    if (update.status === 200) {
      const dataNotif = {
        appId: update.data?.id as any,
        status: update.data?.MasterStatus?.name as any,
        userId: update.data?.authorId as any,
        pesan: update.data?.title as any,
        kategoriApp: "JOB",
        title: "Mengajukan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      }

      setStatus("Review");
      ComponentGlobal_NotifikasiBerhasil("Berhasil Diajukan");
      router.push(RouterJob.status);
    } else {
      ComponentGlobal_NotifikasiGagal(update.message);
    }
  }

  async function onDelete() {
    await Job_funDeleteById(jobId).then((res) => {
      if (res.status === 200) {
        setStatus("Draft");
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterJob.status);
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
          color="yellow"
          onClick={() => {
            onAction();
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
      </Group>
    </>
  );
}
