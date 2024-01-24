"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { Stack, TextInput, Textarea, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function Event_Edit() {
  const router = useRouter();
  return (
    <>
      <Stack px={"sm"}>
        <TextInput label="Judul" placeholder="Masukan judul" withAsterisk />
        <TextInput
          label="Lokasi"
          placeholder="Masukan lokasi acara"
          withAsterisk
        />
        <DateTimePicker
          withAsterisk
          label="Tanggal & Waktu "
          placeholder="Masukan tangal dan waktu acara"
          onChange={(val) => console.log(val)}
        />
        <Textarea
          label="Deskripsi"
          placeholder="Deskripsikan acara yang akan di selenggarakan"
          withAsterisk
        />

        <Button radius={"xl"} mt={"xl"} onClick={() => onUpdate(router)}>
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(router: AppRouterInstance) {
  ComponentGlobal_NotifikasiBerhasil("Update berhasil");
  router.back();
}
