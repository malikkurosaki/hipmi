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
import ComponentGlobal_BoxInformation from "@/app_modules/component_global/box_information";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import { useState } from "react";
import ComponentGlobal_UI_Modal from "@/app_modules/component_global/ui/ui_modal";

export default function Job_DetailDraft({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        {dataJob.catatan ? (
          <ComponentGlobal_BoxInformation
            informasi={dataJob.catatan}
            isReport={true}
          />
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
  const [isAjukan, setAjukan] = useState(false);

  async function onAjukan() {
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
      {/* HAPUS */}
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

      {/* AJUKAN KEMBALI */}
      {/* <Modal
        opened={isAjukan}
        onClose={() => {
          setAjukan(false);
        }}
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
            Anda yakin akan melakukan pengajuan review kembali ?
          </Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                setAjukan(false);
              }}
            >
              Batal
            </Button>
            <Button
              radius={"xl"}
              color="yellow"
              onClick={() => {
                onAjukan();
              }}
            >
              Ajukan
            </Button>
          </Group>
        </Stack>
      </Modal> */}

      {/* Ajukan */}
      <ComponentGlobal_UI_Modal
        opened={isAjukan}
        close={() => setAjukan(false)}
        title={" Anda sudah yakin akan melakukan pengajuan review kembali ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setAjukan(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color="orange"
            onClick={() => {
              onAjukan();
            }}
          >
            Simpan
          </Button>
        }
      />

      {/* Hapus */}
      <ComponentGlobal_UI_Modal
        opened={opened}
        close={() => close()}
        title={"Anda yakin ingin menghapus ?"}
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
            hapus
          </Button>
        }
      />

      <Group grow my={"lg"}>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            setAjukan(true);
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
