"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Stack,
  TextInput,
  Textarea,
  Button,
  Select,
  Text,
  Group,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../model/interface";
import { useState } from "react";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import { Event_funEditById } from "../fun/edit/fun_edit_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import moment from "moment";
import _ from "lodash";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { IconAlertTriangle } from "@tabler/icons-react";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";

export default function Event_Edit({
  dataEvent,
  listTipeAcara,
}: {
  dataEvent: MODEL_EVENT;
  listTipeAcara: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState(dataEvent);
  const [tipe, setTipe] = useState(listTipeAcara);

  // Masimal karakter state
  const [maxTitle, setMaxTitle] = useState("");
  const [maxLokasi, setMaxLokasi] = useState("");
  const [maxDeskripsi, setMaxDeskripsi] = useState("");
  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          placeholder="judul"
          withAsterisk
          value={value.title}
          maxLength={100}
          error={
            value.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
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
          placeholder="lokasi acara"
          withAsterisk
          value={value.lokasi}
          maxLength={100}
          error={
            value.lokasi === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan lokasi" />
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
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
          withAsterisk
          label="Tanggal & Waktu "
          placeholder="Masukan tangal dan waktu acara"
          value={value.tanggal}
          error={
            moment(value.tanggal.toISOString().toString()).diff(
              moment(),
              "minutes"
            ) < 0 ? (
              <ComponentGlobal_ErrorInput text="Invalid Time" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setValue({
              ...(value as any),
              tanggal: val,
            });
          }}
        />

        <Stack spacing={5}>
          <Textarea
            label="Deskripsi"
            placeholder="Deskripsikan acara yang akan di selenggarakan"
            withAsterisk
            autosize
            value={value.deskripsi}
            maxLength={300}
            error={
              value.deskripsi === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
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
          <ComponentGlobal_InputCountDown
            maxInput={300}
            lengthInput={value.deskripsi.length}
          />
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={
            value.title === "" ||
            value.lokasi === "" ||
            value.deskripsi === "" ||
            value.eventMaster_TipeAcaraId === 0 ||
            value.tanggal.toISOString.toString() ===
              "function Date() { [native code] }" ||
            moment(value.tanggal).diff(moment(), "minutes") < 0
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          mt={"xl"}
          onClick={() => onUpdate(router, value, setLoading)}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  value: MODEL_EVENT,
  setLoading: any
) {
  if (_.values(value).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

  await Event_funEditById(value).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setLoading(true);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
