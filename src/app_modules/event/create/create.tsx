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
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { TimeInput } from "@mantine/dates";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_event_status } from "../global_state";

export default function Event_Create({ listUser }: { listUser: MODEL_USER[] }) {
  const router = useRouter();
  const [img, setImg] = useState<any>();
  const [file, setFile] = useState<any>();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);

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

        <Button
          radius={"xl"}
          mt={"xl"}
          onClick={() => onSave(router, setTabsStatus)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onSave(router: AppRouterInstance, setTabsStatus: any) {
  ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
  setTabsStatus("Review");
  router.push(RouterEvent.status_page);
}
