"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_COLLABORATION_MASTER } from "../model/interface";
import colab_funCreateProyek from "../fun/create/fun_create_proyek";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Colab_Create({
  listIndustri,
}: {
  listIndustri: MODEL_COLLABORATION_MASTER[];
}) {
  const [value, setValue] = useState({
    title: "",
    lokasi: "",
    purpose: "",
    benefit: "",
    projectCollaborationMaster_IndustriId: 0,
  });
  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
          onChange={(val) => {
            setValue({
              ...value,
              title: val.currentTarget.value,
            });
          }}
        />

        <TextInput
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
          onChange={(val) => {
            setValue({
              ...value,
              lokasi: val.currentTarget.value,
            });
          }}
        />

        <Select
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          data={listIndustri.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) => {
            setValue({
              ...value,
              projectCollaborationMaster_IndustriId: val as any,
            });
          }}
        />

        <Textarea
          label="Tujuan Proyek"
          placeholder="Masukan tujuan proyek"
          withAsterisk
          minRows={5}
          onChange={(val) => {
            setValue({
              ...value,
              purpose: val.currentTarget.value,
            });
          }}
        />

        <Textarea
          label="Keuntungan "
          placeholder="Masukan keuntungan dalam proyek"
          withAsterisk
          minRows={5}
          onChange={(val) => {
            setValue({
              ...value,
              benefit: val.currentTarget.value,
            });
          }}
        />
        <ButtonAction value={value} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSave() {
    await colab_funCreateProyek(value).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message)
      }
    });
  }

  return (
    <>
      <Button
        loaderPosition="center"
        loading={loading ? true : false}
        mt={"xl"}
        radius={"xl"}
        onClick={() => onSave()}
      >
        Simpan
      </Button>
    </>
  );
}
