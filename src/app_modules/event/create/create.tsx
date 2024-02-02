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
  Text,
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
import _ from "lodash";
import toast from "react-simple-toasts";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";

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

  // Masimal karakter state
  const [maxTitle, setMaxTitle] = useState("");
  const [maxLokasi, setMaxLokasi] = useState("");
  const [maxDeskripsi, setMaxDeskripsi] = useState("");

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
          maxLength={100}
          error={
            maxTitle.length >= 100 ? (
              <ComponentEvent_ErrorMaximalInput max={100} />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setMaxTitle(val.target.value);
            setValue({
              ...value,
              title: val.target.value,
            });
          }}
        />

        <Select
          withAsterisk
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
          maxLength={200}
          error={
            maxLokasi.length >= 200 ? (
              <ComponentEvent_ErrorMaximalInput max={200} />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setMaxLokasi(val.target.value);
            setValue({
              ...value,
              lokasi: val.target.value,
            });
          }}
        />
        <DateTimePicker
          // onClick={() => {
          //   console.log(moment().diff(moment("2024-02-01"), "days"));
          // }}
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
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
          autosize
          maxLength={500}
          error={
            maxDeskripsi.length >= 500 ? (
              <ComponentEvent_ErrorMaximalInput max={500} />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setMaxDeskripsi(val.target.value);
            setValue({
              ...value,
              deskripsi: val.target.value,
            });
          }}
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
  if (_.values(value).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
  if (value.eventMaster_TipeAcaraId === 0)
    return ComponentGlobal_NotifikasiPeringatan("Pilih Tipe Acara");
  if (moment(value.tanggal).format() === "Invalid date")
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");
  await Event_funCreate(value).then((res) => {
    if (res.status === 201) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setTabsStatus("Review");
      setHotMenu(1);
      router.push(RouterEvent.status_page);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
