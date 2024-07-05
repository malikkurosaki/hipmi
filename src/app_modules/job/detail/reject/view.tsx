"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Button, Group, Modal, Paper, Stack, Title } from "@mantine/core";
import { useAtom } from "jotai";

import ComponentGlobal_BoxInformation from "@/app_modules/component_global/box_information";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { gs_job_status } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_UI_Modal from "@/app_modules/component_global/ui/ui_modal";

export default function Job_DetailReject({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentGlobal_BoxInformation
          informasi={dataJob.catatan}
          isReport={true}
        />
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

  async function onEditKembali() {
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
      <ComponentGlobal_UI_Modal
        opened={opened}
        close={() => close()}
        title={" Anda yakin ingin menghapus  ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              close();
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color="red"
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />

      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
      >
        <Stack>
          <Title order={6} c={"white"} align="center">
            Yakin ingin menghapus ini ?
          </Title>
          <Group position="center">
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
      </Modal> */}

      <Group grow my={"xl"}>
        <Button
          radius={"xl"}
          color="orange"
          onClick={() => {
            onEditKembali();
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
