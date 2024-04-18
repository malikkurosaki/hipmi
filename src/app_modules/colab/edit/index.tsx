"use client";

import { Stack, TextInput, Select, Textarea, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_MASTER,
} from "../model/interface";
import colab_funEditById from "../fun/edit/fun_edit_by_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";

export default function Colab_Edit({
  selectedData,
  listIndustri,
}: {
  selectedData: MODEL_COLLABORATION;
  listIndustri: MODEL_COLLABORATION_MASTER[];
}) {
  const [value, setValue] = useState(selectedData);
  return (
    <>
      <Stack px={"sm"}>
        {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
          value={value.title}
          onChange={(val) =>
            setValue({
              ...value,
              title: val.currentTarget.value,
            })
          }
        />

        <TextInput
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
          value={value.lokasi}
          onChange={(val) =>
            setValue({
              ...value,
              lokasi: val.currentTarget.value,
            })
          }
        />

        <Select
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          value={value?.ProjectCollaborationMaster_Industri.id}
          data={listIndustri.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={
            (val) =>
              setValue({
                ...(value as any),
                ProjectCollaborationMaster_Industri: {
                  id: val as any,
                },
              })
            // console.log(val)
          }
        />

        <Textarea
          label="Tujuan Proyek"
          placeholder="Masukan tujuan proyek"
          withAsterisk
          minRows={5}
          value={value.purpose}
          onChange={(val) =>
            setValue({
              ...value,
              purpose: val.currentTarget.value,
            })
          }
        />

        <Textarea
          label="Keuntungan "
          placeholder="Masukan keuntungan dalam proyek"
          withAsterisk
          minRows={5}
          value={value.benefit}
          onChange={(val) =>
            setValue({
              ...value,
              benefit: val.currentTarget.value,
            })
          }
        />
        <ButtonAction value={value as any} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    await colab_funEditById(value as any).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
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
        onClick={() => onUpdate()}
      >
        Update
      </Button>
    </>
  );
}
