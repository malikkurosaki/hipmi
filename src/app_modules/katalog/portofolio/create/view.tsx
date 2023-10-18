"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { BIDANG_BISNIS } from "@/app_modules/models/portofolio";
import { Button, Select, Stack, TextInput, Title } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import funCreatePortofolio from "../fun/fun_create_portofolio";

export default function CreatePortofolio({
  bidangBisnis,
  profileId,
}: {
  bidangBisnis: BIDANG_BISNIS;
  profileId: any;
}) {
  const router = useRouter();
  const [value, setValue] = useState({
    namaBisnis: "",
    bidangBisnisId: "",
    alamatKantor: "",
    tlpn: "",
    deskripsi: "",
  });

  async function onSubmit() {
    const body = {
      profileId: profileId,
      namaBisnis: value.namaBisnis,
      masterBidangBisnisId: value.bidangBisnisId,
      alamatKantor: value.alamatKantor,
      tlpn: value.tlpn,
      deskripsi: value.deskripsi,
    };

    if (_.values(body).includes("")) return toast("Lengkapi Data");

    await funCreatePortofolio(body as any).then((res) => {
      if (res.status === 201) {
        toast("Berhasil disimpan");
        return setTimeout(() => router.push(`/dev/katalog/${profileId}`), 1000)
      } else {
        return toast("Gagal disimpan");
      }
    });
  }

  return (
    <>
      {/* {JSON.stringify(profileId)} */}

      <Stack px={"sm"}>
        <TextInput
          label="Nama Bisnis"
          onChange={(val) => {
            setValue({
              ...value,
              namaBisnis: val.target.value,
            });
          }}
        />
        <Select
          label="Bidang Bisnis"
          data={_.map(bidangBisnis as any).map((e: any) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) => {
            setValue({
              ...value,
              bidangBisnisId: val as any,
            });
          }}
        />
        <TextInput
          label="Alamat Kantor"
          onChange={(val) => {
            setValue({
              ...value,
              alamatKantor: val.target.value,
            });
          }}
        />
        <TextInput
          label="Nomor Telepon"
          type="number"
          onChange={(val) => {
            setValue({
              ...value,
              tlpn: val.target.value,
            });
          }}
        />
        <TextInput
          label="Deskripsi"
          onChange={(val) => {
            setValue({
              ...value,
              deskripsi: val.target.value,
            });
          }}
        />

        <Button
          mt={"md"}
          radius={50}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() => {
            onSubmit();
          }}
        >
          Simpan
        </Button>
      </Stack>

      {/* <pre> {JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
