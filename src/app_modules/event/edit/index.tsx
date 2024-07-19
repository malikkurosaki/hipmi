"use client";

import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import { Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Event_funEditById } from "../fun/edit/fun_edit_by_id";
import { MODEL_EVENT } from "../model/interface";
import { MainColor } from "@/app_modules/_global/color/color_pallet";

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
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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
            styles={{
              label: {
                color: "white",
              },
            }}
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
          bg={MainColor.yellow}
          color="yellow"
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
