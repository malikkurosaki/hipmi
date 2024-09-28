"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { Button, Group, Stack } from "@mantine/core";
import { useAtom } from "jotai";

import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { gs_job_status } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";

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
      <UIGlobal_Modal
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
      <UIGlobal_Modal
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
