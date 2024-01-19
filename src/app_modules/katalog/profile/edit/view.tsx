"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

import funEditProfile from "../fun/fun_edit_profile";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { MODEL_PROFILE } from "../model/interface";
import { Profile_funEditById } from "../fun/update/fun_edit_profile_by_id";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";

export default function EditProfile({ data }: { data: MODEL_PROFILE }) {
  const router = useRouter();

  //Get data profile
  const [dataProfile, setDataProfile] = useState(data);

  async function onUpdate() {
    const body = dataProfile;
    if (_.values(body).includes("")) return toast("Lengkapi data");

    await Profile_funEditById(body).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setTimeout(() => router.back(), 1000)
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  if (!dataProfile)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Username"
          disabled
          value={dataProfile.User.username}
        />
        <TextInput label="Nomor" disabled value={dataProfile.User.nomor} />

        <TextInput
          label="Nama"
          placeholder="Nama"
          value={dataProfile.name}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              name: val.target.value,
            });
          }}
        />

        <TextInput
          label="Email"
          placeholder="email"
          value={dataProfile.email}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              email: val.target.value,
            });
          }}
        />

        <TextInput
          label="Alamat"
          placeholder="alamat"
          value={dataProfile.alamat}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          label="Jenis Kelamin"
          value={dataProfile.jenisKelamin}
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val: any) => {
            setDataProfile({
              ...dataProfile,
              jenisKelamin: val
            });
          }}
        />

        <Button
          mt={"md"}
          radius={50}
          bg={Warna.biru}
          color="cyan"
          onClick={() => onUpdate()}
        >
          Update
        </Button>
      </Stack>

      {/* <pre>{JSON.stringify(dataProfile, null, 2)}</pre> */}
    </>
  );
}
