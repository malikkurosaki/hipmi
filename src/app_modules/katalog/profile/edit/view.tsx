"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { gs_token } from "@/app_modules/home/state/global_state";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { gs_profile } from "../state/global_state";
import { loadDataProfile } from "../fun/fun_get_profile";

export default function EditProfile({ data }: { data: any }) {
  const router = useRouter();

  //Get data profile
  const [profile, setProfile] = useAtom(gs_profile)
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  async function onUpdate() {
    const body = profile;
    if (_.values(body).includes("")) return toast("Lengkapi data");

    await fetch(ApiHipmi.edit_profile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        myConsole(val);
        if (val.status == 200) {
          toast("Data tersimpan");
          loadDataProfile(setProfile)
          return setTimeout(() => router.push("/dev/katalog/view"), 1000);
        } else {
          return toast("Gagal update !!!");
        }
      });
  }

  if(!profile) return <></>

  return (
    <>
      {/* {JSON.stringify(profile)} */}
      <Stack px={"sm"}>
        <TextInput label="Username" disabled value={profile?.User.username} />
        <TextInput label="Nomor" disabled value={profile?.User.nomor} />

        <TextInput
          label="Nama"
          placeholder="username"
          value={profile?.name}
          onChange={(val) => {
            setProfile({
              ...profile,
              name: val.target.value,
            });
          }}
        />

        <TextInput
          label="Email"
          placeholder="email"
          value={profile?.email}
          onChange={(val) => {
            myConsole(val.target.value);
            setProfile({
              ...profile,
              email: val.target.value,
            });
          }}
        />

        <TextInput
          label="Alamat"
          placeholder="alamat"
          value={profile?.alamat}
          onChange={(val) => {
            myConsole(val.target.value);
            setProfile({
              ...profile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          label="Jenis Kelamin"
          value={profile?.jenisKelamin}
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val) => {
            setProfile({
              ...profile,
              jenisKelamin: val as string,
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
    </>
  );
}
