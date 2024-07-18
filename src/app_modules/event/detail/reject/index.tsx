"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_event_status } from "../../global_state";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { useDisclosure } from "@mantine/hooks";
import { MODEL_EVENT } from "../../model/interface";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentEvent_CatatanReject from "../../component/catatan_reject";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { useState } from "react";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";

export default function Event_DetailReject({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentGlobal_BoxInformation
          isReport
          informasi={dataEvent.catatan}
        />
        <ComponentEvent_DetailData data={dataEvent} />
        <ButtonAction eventId={dataEvent?.id} />
      </Stack>

      {/* <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Yakin akan menghapus event ini?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onDelete(router, dataEvent.id, close);
                close();
                router.back();
              }}
              color="red"
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal> */}
    </>
  );
}

function ButtonAction({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  return (
    <>
      <SimpleGrid cols={2}>
        <Button
          w={"100%"}
          radius={"xl"}
          color="yellow"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Edit Kembali
        </Button>
        <Button
          w={"100%"}
          radius={"xl"}
          color="red"
          onClick={() => setOpenModal2(true)}
        >
          Hapus
        </Button>
      </SimpleGrid>

      {/* MODAL EDIT */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengedit kembali event ini ?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal1(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color={"yellow"}
            onClick={() => {
              onUpdate(router, setTabsStatus, eventId);
              setOpenModal1(false);
            }}
          >
            Edit
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus event ini?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal2(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color={"red"}
            onClick={() => {
              onDelete(router, eventId, close);
              setOpenModal2(false);

            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  setTabsStatus: any,
  eventId: string
) {
  await Event_funEditStatusById("3", eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setTabsStatus("Draft");
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onDelete(
  router: AppRouterInstance,
  eventId: string,
  close: any
) {
  await Event_funDeleteById(eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
