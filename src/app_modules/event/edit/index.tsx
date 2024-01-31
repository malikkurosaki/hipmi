"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, TextInput, Textarea, Button, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../model/interface";
import { useState } from "react";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Event_funEditById } from "../fun/edit/fun_edit_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Event_Edit({
  dataEvent,
  listTipeAcara,
}: {
  dataEvent: MODEL_EVENT;
  listTipeAcara: MODEL_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(dataEvent);
  const [tipe, setTipe] = useState(listTipeAcara);
  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          placeholder="Masukan judul"
          withAsterisk
          value={value.title}
          onChange={(val) => {
            setValue({
              ...value,
              title: val.target.value,
            });
          }}
        />

        <Select
          label="Tipe Acara"
          placeholder="Pilih Tipe Acara"
          data={tipe.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          value={value.EventMaster_TipeAcara.id}
          onChange={(val) => {
            setValue({
              ...(value as any),
              EventMaster_TipeAcara: {
                id: val,
              },
            });
          }}
        />

        <TextInput
          label="Lokasi"
          placeholder="Masukan lokasi acara"
          withAsterisk
          value={value.lokasi}
          onChange={(val) => {
            setValue({
              ...value,
              lokasi: val.target.value,
            });
          }}
        />
        <DateTimePicker
          withAsterisk
          label="Tanggal & Waktu "
          placeholder="Masukan tangal dan waktu acara"
          value={value.tanggal}
          onChange={(val) => {
            setValue({
              ...(value as any),
              tanggal: val,
            });
          }}
        />
        <Textarea
          label="Deskripsi"
          placeholder="Deskripsikan acara yang akan di selenggarakan"
          withAsterisk
          autosize
          maxLength={500}
          value={value.deskripsi}
          onChange={(val) => {
            setValue({
              ...value,
              deskripsi: val.target.value,
            });
          }}
        />

        <Button radius={"xl"} mt={"xl"} onClick={() => onUpdate(router, value)}>
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(router: AppRouterInstance, value: MODEL_EVENT) {
  await Event_funEditById(value).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
