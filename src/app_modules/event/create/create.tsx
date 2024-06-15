"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import {
  Button,
  Select,
  Stack,
  TextInput,
  Textarea
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useAtom } from "jotai";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";
import { Event_funCreate } from "../fun/create/fun_create";
import { gs_event_hotMenu, gs_event_status } from "../global_state";

export default function Event_Create({
  listTipeAcara,
  authorId,
}: {
  listTipeAcara: MODEL_DEFAULT_MASTER_OLD[];
  authorId: string;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const [listTipe, setListTipe] = useState(listTipeAcara);
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);
  const [isTime, setIsTime] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState({
    title: "",
    lokasi: "",
    deskripsi: "",
    tanggal: Date.toString(),
    eventMaster_TipeAcaraId: 0,
    authorId: authorId,
  });

  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          placeholder="Masukan judul"
          withAsterisk
          maxLength={100}
          onChange={(val) => {
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
          maxLength={100}
          onChange={(val) => {
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
          error={
            isTime ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            // console.log(
            //   moment(val?.toISOString().toString()).diff(moment(), "minutes" )
            // );
            moment(val?.toISOString().toString()).diff(moment(), "minutes") < 0
              ? setIsTime(true)
              : setIsTime(false);

            setValue({
              ...value,
              tanggal: val as any,
            });
          }}
        />

        <Stack spacing={5}>
          <Textarea
            label="Deskripsi"
            placeholder="Deskripsikan acara yang akan di selenggarakan"
            withAsterisk
            autosize
            maxLength={300}
            onChange={(val) => {
              setValue({
                ...value,
                deskripsi: val.target.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.deskripsi.length}
            maxInput={300}
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
            value.tanggal === "function Date() { [native code] }" ||
            moment(value.tanggal).diff(moment(), "minutes") < 0
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          mt={"xl"}
          onClick={() =>
            onSave(router, setTabsStatus, value, setHotMenu, setLoading)
          }
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
  setHotMenu: any,
  setLoading: any
) {
  // if (_.values(value).includes(""))
  //   return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
  // if (value.eventMaster_TipeAcaraId === 0)
  //   return ComponentGlobal_NotifikasiPeringatan("Pilih Tipe Acara");
  // if (moment(value.tanggal).format() === "Invalid date")
  //   return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");
  // if (
  //   moment(value.tanggal.toISOString().toString()).diff(moment(), "minutes") < 0
  // )
  //   return null;

  await Event_funCreate(value).then((res) => {
    if (res.status === 201) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setTabsStatus("Review");
      setHotMenu(1);
      setLoading(true);
      router.push(RouterEvent.status_page);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
