"use client"

import { Stack, TextInput, Select, Textarea, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Colab_Edit() {
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

  async function onUpdate() {
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
        onClick={() => onUpdate()}
      >
        Update
      </Button>
    </>
  );
}
