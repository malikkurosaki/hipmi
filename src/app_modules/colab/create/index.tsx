"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Colab_Create() {
  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
        />

        <TextInput
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
        />

        <Select
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          data={[
            { value: "1", label: "Teknologi" },
            { value: "2", label: "Tambang Batu Bara" },
          ]}
        />

        <Textarea
          label="Tujuan Proyek"
          placeholder="Masukan tujuan proyek"
          withAsterisk
          minRows={5}
        />

        <Textarea
          label="Keuntungan "
          placeholder="Masukan keuntungan dalam proyek"
          withAsterisk
          minRows={5}
        />
        <ButtonAction />
      </Stack>
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSave() {
    setLoading(true);
    router.back();
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
