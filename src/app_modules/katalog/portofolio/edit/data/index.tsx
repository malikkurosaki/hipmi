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
            error={value.namaBisnis.length > 100 ? "Maksimal 100 karakter" : ""}
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
            error={
              value.alamatKantor.length > 100 ? "Maksimal 100 karakter" : ""
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
            placeholder="62 xxx xxx xxx"
            type="number"
            onChange={(val) => {
              setValue({
                ...value,
                tlpn: val.target.value,
              });
            }}
          />
          <Textarea
            autosize
            minRows={2}
            maxRows={5}
            withAsterisk
            value={value.deskripsi}
            label="Deskripsi"
            placeholder="Deskripsi singkat mengenai usaha"
            error={value.deskripsi.length > 150 ? "Maksimal 150 karakter" : ""}
            onChange={(val) => {
              setValue({
                ...value,
                deskripsi: val.target.value,
              });
            }}
          />
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
  if (_.values(data).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

  if (data.namaBisnis.length > 100) return null;
  if (data.alamatKantor.length > 100) return null;
  if (data.deskripsi.length > 150) return null;

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
