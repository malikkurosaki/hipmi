"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  Select,
  AspectRatio,
  Paper,
  Center,
  Button,
  TextInput,
  Image,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_donasi_tabs_posting } from "../../global_state";
import toast from "react-simple-toasts";

export default function EditDonasi() {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onUpdate() {
    router.back();
    toast("Berhasil update data")
  }
  return (
    <>
      <Stack spacing={"md"} px={"md"}>
        <Select
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          withAsterisk
          data={[
            { value: "1", label: "Medis" },
            { value: "2", label: "Lingkungan" },
            { value: "3", label: "Kegiatan Sosial" },
            { value: "4", label: "Rumah Ibadah" },
            { value: "5", label: "Bantuan Pendidikan" },
          ]}
        />
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image alt="Foto" src={"/aset/no-img.png"} />
            </Paper>
          </AspectRatio>
          <Center>
            <Button
              radius={"xl"}
              variant="outline"
              w={150}
              leftIcon={<IconCamera />}
            >
              Upload
            </Button>
          </Center>
        </Stack>
        <Stack>
          <TextInput
            withAsterisk
            label="Judul Donasi"
            placeholder="Contoh: Renovasi Masjid pada kampung, dll"
          />
          <TextInput
            type="number"
            withAsterisk
            label="Target Dana"
            placeholder="Masukan nominal angka"
          />
          <Select
            label="Durasi"
            placeholder="Jangka waktu penggalangan dana"
            withAsterisk
            data={[
              { value: "30", label: "30 Hari" },
              { value: "60", label: "60 Hari" },
              { value: "90", label: "90 Hari" },
            ]}
          />
        </Stack>
        <Button my={"lg"} radius={"xl"} onClick={() => onUpdate()}>
          Update
        </Button>
      </Stack>
    </>
  );
}
