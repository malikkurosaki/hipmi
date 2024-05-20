"use client";

import { Box, Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import {
  MODEL_PORTOFOLIO,
  MODEL_PORTOFOLIO_BIDANG_BISNIS,
} from "../../model/interface";
import { useState } from "react";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Portofolio_funEditDataBisnis } from "../../fun/edit/fun_edit_data_bisnis_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/component_global/input_countdown";

export default function Portofolio_EditDataBisnis({
  dataPorto,
  listBidang,
}: {
  dataPorto: MODEL_PORTOFOLIO;
  listBidang: MODEL_PORTOFOLIO_BIDANG_BISNIS[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(dataPorto);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Stack spacing={50} p={"md"}>
        <Stack>
          <TextInput
            withAsterisk
            value={value.namaBisnis}
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            error={
              value.namaBisnis === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nama bisnis" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                namaBisnis: val.target.value,
              });
            }}
          />
          <Select
            withAsterisk
            value={value.MasterBidangBisnis.id}
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={listBidang.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                MasterBidangBisnis: {
                  id: val,
                },
              });
            }}
          />
          <TextInput
            withAsterisk
            value={value.alamatKantor}
            label="Alamat Kantor"
            placeholder="Alamat kantor"
            maxLength={100}
            error={
              value.alamatKantor === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan alamat kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                alamatKantor: val.target.value,
              });
            }}
          />
          <TextInput
            withAsterisk
            value={value.tlpn}
            label="Nomor Telepon Kantor"
            placeholder="Nomor telepon kantor"
            type="number"
            maxLength={15}
            error={
              value.tlpn === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nomor telepon kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                tlpn: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              value={value.deskripsi}
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
              maxLength={150}
              error={
                value.deskripsi === "" ? (
                  <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
                ) : (
                  ""
                )
              }
              onChange={(val) => {
                setValue({
                  ...value,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={150}
              lengthInput={value.deskripsi.length}
            />
          </Stack>
        </Stack>
        <Button
          radius={"xl"}
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => {
            onUpdate(router, value as any, setLoading);
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  data: MODEL_PORTOFOLIO,
  setLoading: any
) {
  if (_.values(data).includes("")) {
    return null;
  }

  // if (data.namaBisnis.length > 100) return null;
  // if (data.alamatKantor.length > 100) return null;
  // if (data.deskripsi.length > 150) return null;

  await Portofolio_funEditDataBisnis(data).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
