"use client";

import ComponentKatalog_NotedBox from "@/app_modules/katalog/component/noted_box";
import { Box, Button, Paper, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { MODEL_PORTOFOLIO_MEDSOS } from "../../model/interface";
import { Portofolio_funEditMedsosById } from "../../fun/edit/fun_edit_medsos_bisnis_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Portofolio_EditMedsosBisnis({
  dataMedsos,
}: {
  dataMedsos: MODEL_PORTOFOLIO_MEDSOS;
}) {
  const router = useRouter();
  const [medsos, setMedsos] = useState(dataMedsos);
  return (
    <>
      <pre>{JSON.stringify(dataMedsos, null, 2)}</pre>
      <Paper shadow="lg" p={"sm"}>
        <Stack px={"sm"}>
          <TextInput
            label="Facebook"
            value={medsos.facebook}
            placeholder="Facebook"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            label="Instagram"
            value={medsos.instagram}
            placeholder="Instagram"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            label="Tiktok"
            value={medsos.tiktok}
            placeholder="Tiktok"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            label="Twitter"
            value={medsos.twitter}
            placeholder="Twitter"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            label="Youtube"
            value={medsos.youtube}
            placeholder="Youtube"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                youtube: val.target.value,
              });
            }}
          />

          <Button
            mt={"xl"}
            radius={"xl"}
            onClick={() => onUpdate(router, medsos)}
          >
            Update
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  medsos: MODEL_PORTOFOLIO_MEDSOS
) {
  await Portofolio_funEditMedsosById(medsos).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
