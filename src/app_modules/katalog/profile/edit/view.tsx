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
import { validRegex } from "../../component/regular_expressions";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";

export default function EditProfile({ data }: { data: MODEL_PROFILE }) {
  const router = useRouter();

  //Get data profile
  const [dataProfile, setDataProfile] = useState(data);
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    const body = dataProfile;

    // console.log(body)
    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    if (!body.email.match(validRegex)) return null;
    if (body.alamat.length > 100) return null;

    await Profile_funEditById(body).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setTimeout(() => router.back(), 1000);
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
      {/* <pre>{JSON.stringify(dataProfile, null, 2)}</pre> */}
      <Stack px={"sm"}>
        <TextInput
          withAsterisk
          label="Nomor"
          disabled
          value={dataProfile?.User?.nomor}
        />

        <TextInput
          withAsterisk
          label="Username"
          error={
            data?.User?.username?.length < 5
              ? "Username minimal 5 karakter"
              : ""
          }
          disabled
          value={dataProfile?.User?.username}
          onChange={(val) => {
            // const dataUsername = _.clone(dataProfile)

            setDataProfile({
              ...(dataProfile as any),
              User: {
                username: val.target.value,
              },
            });
          }}
        />

        <TextInput
          withAsterisk
          label="Nama"
          placeholder="Nama"
          value={dataProfile?.name}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              name: val.target.value,
            });
          }}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="email"
          error={
            dataProfile?.email?.length > 0 &&
            !dataProfile?.email.match(validRegex)
              ? "Invalid email"
              : ""
          }
          value={dataProfile?.email}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              email: val.target.value,
            });
          }}
        />

        <TextInput
          withAsterisk
          label="Alamat"
          placeholder="alamat"
          value={dataProfile.alamat}
          error={dataProfile.alamat.length > 100 ? "Max 100 karakter" : ""}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          withAsterisk
          label="Jenis Kelamin"
          value={dataProfile?.jenisKelamin}
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val: any) => {
            setDataProfile({
              ...dataProfile,
              jenisKelamin: val,
            });
          }}
        />

        <Button
          mt={"md"}
          radius={50}
          bg={Warna.biru}
          color="cyan"
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => onUpdate()}
        >
          Update
        </Button>
      </Stack>

      {/* <pre>{JSON.stringify(dataProfile, null, 2)}</pre> */}
    </>
  );
}
