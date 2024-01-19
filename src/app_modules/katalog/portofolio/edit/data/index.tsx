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

export default function Portofolio_EditDataBisnis({
  dataPorto,
  listBidang,
}: {
  dataPorto: MODEL_PORTOFOLIO;
  listBidang: MODEL_PORTOFOLIO_BIDANG_BISNIS[];
}) {
  const router = useRouter();
  const [porto, setPorto] = useState(dataPorto);
  //   const [value, setPorto] = useState({
  //     namaBisnis: "",
  //     masterBidangBisnisId: "",
  //     alamatKantor: "",
  //     tlpn: "",
  //     deskripsi: "",
  //   });
  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Stack spacing={50} p={"md"}>
        <Stack>
          <TextInput
            withAsterisk
            value={porto.namaBisnis}
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            onChange={(val) => {
              setPorto({
                ...porto,
                namaBisnis: val.target.value,
              });
            }}
          />
          <Select
            withAsterisk
            value={porto.MasterBidangBisnis.id}
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={listBidang.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setPorto({
                ...(porto as any),
                MasterBidangBisnis: {
                  id: val,
                },
              });
            }}
          />
          <TextInput
            withAsterisk
            value={porto.alamatKantor}
            label="Alamat Kantor"
            placeholder="Alamat kantor"
            onChange={(val) => {
              setPorto({
                ...porto,
                alamatKantor: val.target.value,
              });
            }}
          />
          <TextInput
            withAsterisk
            value={porto.tlpn}
            label="Nomor Telepon Kantor"
            placeholder="62 xxx xxx xxx"
            type="number"
            onChange={(val) => {
              setPorto({
                ...porto,
                tlpn: val.target.value,
              });
            }}
          />
          <Textarea
            autosize
            minRows={2}
            maxRows={5}
            withAsterisk
            value={porto.deskripsi}
            label="Deskripsi"
            placeholder="Deskripsi singkat mengenai usaha"
            onChange={(val) => {
              setPorto({
                ...porto,
                deskripsi: val.target.value,
              });
            }}
          />
        </Stack>
        <Button
          radius={"xl"}
          onClick={() => {
            onUpdate(router, porto as any);
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(router: AppRouterInstance, data: MODEL_PORTOFOLIO) {
  await Portofolio_funEditDataBisnis(data).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
