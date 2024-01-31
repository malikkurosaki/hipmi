"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  MultiSelect,
  Paper,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput, DatePicker, DateTimePicker } from "@mantine/dates";
import { TimeInput } from "@mantine/dates";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_event_hotMenu, gs_event_status } from "../global_state";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Event_funCreate } from "../fun/create/fun_create";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { kMaxLength } from "buffer";

export default function Event_Create({
  listTipeAcara,
  authorId,
}: {
  listTipeAcara: MODEL_DEFAULT_MASTER[];
  authorId: string;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [listTipe, setListTipe] = useState(listTipeAcara);
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);


  const [value, setValue] = useState({
    title: "",
    lokasi: "",
    deskripsi: "",
    tanggal: Date,
    eventMaster_TipeAcaraId: 0,
    authorId: authorId,
  });

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          placeholder="Masukan judul"
          withAsterisk
          onChange={(val) =>
            setValue({
              ...value,
              title: val.target.value,
            })
          }
        />

        <Select
          label="Tipe Acara"
          placeholder="Pilih Tipe Acara"
          data={listTipe.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val: any) =>
            setValue({
              ...value,
              eventMaster_TipeAcaraId: val,
            })
          }
        />

        <TextInput
          label="Lokasi"
          placeholder="Masukan lokasi acara"
          withAsterisk
          onChange={(val) =>
            setValue({
              ...value,
              lokasi: val.target.value,
            })
          }
        />
        <DateTimePicker
          withAsterisk
          label="Tanggal & Waktu "
          placeholder="Masukan tangal dan waktu acara"
          onChange={(val: any) =>
            setValue({
              ...value,
              tanggal: val,
            })
          }
        />
        <Textarea
          label="Deskripsi"
          placeholder="Deskripsikan acara yang akan di selenggarakan"
          withAsterisk
          maxLength={500}
          autosize
          onChange={(val) =>
            setValue({
              ...value,
              deskripsi: val.target.value,
            })
          }
        />

        <Button
          radius={"xl"}
          mt={"xl"}
          onClick={() => onSave(router, setTabsStatus, value, setHotMenu)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onSave(
  router: AppRouterInstance,
  setTabsStatus: any,
  value: any,
  setHotMenu: any
) {
  await Event_funCreate(value).then((res) => {
    if (res.status === 201) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setTabsStatus("Review");
      setHotMenu(1)
      router.push(RouterEvent.status_page);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
