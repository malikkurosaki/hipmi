"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { gs_token } from "@/app_modules/home/state/global_state";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { gs_profile } from "../state/global_state";
import { loadDataProfile } from "../fun/fun_get_profile";
import { USER_PROFILE } from "@/app_modules/models/user_profile";
import funEditProfile from "../fun/fun_edit_profile";

export default function EditProfile({ data }: { data: USER_PROFILE }) {
  const router = useRouter();

  //Get data profile
  const [dataProfile, setDataProfile] = useState(data);

  async function onUpdate() {
    const body = dataProfile;
    if (_.values(body).includes("")) return toast("Lengkapi data");

    await funEditProfile(body).then((res) => {
      if (res.status === 200) {
        toast("Update berhasil");
        setTimeout(() => router.push(`/dev/katalog/${data.Profile?.id}`), 1000);
      } else {
        toast("Gagal update");
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
        <TextInput label="Username" disabled value={dataProfile.username} />
        <TextInput label="Nomor" disabled value={dataProfile.nomor} />

        <TextInput
          label="Nama"
          placeholder="username"
          value={dataProfile.Profile?.name}
          onChange={(val) => {
            setDataProfile({
              ...(dataProfile as any),
              Profile: {
                ...dataProfile.Profile,
                name: val.target.value,
              },
            });
          }}
        />

        <TextInput
          label="Email"
          placeholder="email"
          value={dataProfile.Profile?.email}
          onChange={(val) => {
            setDataProfile({
              ...(dataProfile as any),
              Profile: {
                ...dataProfile.Profile,
                email: val.target.value,
              },
            });
          }}
        />

        <TextInput
          label="Alamat"
          placeholder="alamat"
          value={dataProfile.Profile?.alamat}
          onChange={(val) => {
            setDataProfile({
              ...(dataProfile as any),
              Profile: {
                ...dataProfile.Profile,
                alamat: val.target.value,
              },
            });
          }}
        />

        <Select
          label="Jenis Kelamin"
          value={dataProfile.Profile?.jenisKelamin}
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val) => {
            setDataProfile({
              ...(dataProfile as any),
              Profile: {
                ...dataProfile.Profile,
                jenisKelamin: val,
              },
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
