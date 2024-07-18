"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  Button,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_MASTER,
} from "../model/interface";
import colab_funCreateProyek from "../fun/create/fun_create_proyek";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import _ from "lodash";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";

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
    // jumlah_partisipan: 0,
  });
  return (
    <>
      <Stack px={"sm"} py={"md"}>
        <TextInput
          maxLength={100}
          styles={{
            label: {
              color: "white",
            },
          }}
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
          styles={{
            label: {
              color: "white",
            },
          }}
          maxLength={100}
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
          styles={{
            label: {
              color: "white",
            },
          }}
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

        {/* <TextInput
          description={
            <Text fz={10}>
              minimal partisipan yang akan di pilih untuk mendiskusikan proyek
            </Text>
          }
          type="number"
          withAsterisk
          label="Jumlah Partisipan"
          placeholder={"2"}
          onChange={(val) => {
            setValue({
              ...value,
              jumlah_partisipan: val.currentTarget.value as any,
            });
          }}
        /> */}

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: "white",
              },
            }}
            maxLength={500}
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
          <ComponentGlobal_InputCountDown
            lengthInput={value.purpose.length}
            maxInput={500}
          />
        </Stack>

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: "white",
              },
            }}
            maxLength={500}
            label="Keuntungan "
            placeholder="Masukan keuntungan dalam proyek"
            minRows={5}
            onChange={(val) => {
              setValue({
                ...value,
                benefit: val.currentTarget.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.benefit.length}
            maxInput={500}
          />
        </Stack>

        <ButtonAction value={value as any} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSave() {
    // console.log(value.jumlah_partisipan);
    if (value.title === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.lokasi === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.purpose === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.projectCollaborationMaster_IndustriId === 0)
      return ComponentGlobal_NotifikasiPeringatan("Pilih Industri");
    // if (value.jumlah_partisipan < 2)
    //   return ComponentGlobal_NotifikasiPeringatan("Minimal Ada 2 Partisipan");

    await colab_funCreateProyek(value).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  // console.log(value);

  return (
    <>
      <Button
        disabled={
          !value.title ||
          !value.lokasi ||
          !value.purpose ||
          !value.benefit ||
          value.projectCollaborationMaster_IndustriId === 0
            ? true
            : false
        }
        loaderPosition="center"
        loading={loading ? true : false}
        mt={"xl"}
        radius={"xl"}
        onClick={() => onSave()}
        bg={MainColor.yellow}
        color={"yellow"}
        style={{
          transition: "0.5s",
        }}
      >
        Simpan
      </Button>
    </>
  );
}
