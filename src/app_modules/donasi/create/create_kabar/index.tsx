"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funCreateKabar } from "../../fun/create/fun_create_kabar";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import _ from "lodash";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { Donasi_funCreateNotif } from "../../fun/create/fun_create_notif";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";

export default function Donasi_CreateKabar({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imageKabar, setImageKabar] = useState<any | null>();
  const [kabar, setKabar] = useState({
    judul: "",
    deskripsi: "",
  });
  return (
    <>
      <Stack>
        <ComponentDonasi_NotedBox informasi="Gambar tidak wajib di isi ! Hanya upload jika di butuhkan." />

        <TextInput
          label="Judul"
          withAsterisk
          placeholder="Masukan judul kabar"
          onChange={(val) => {
            setKabar({
              ...kabar,
              judul: val.target.value,
            });
          }}
        />
        <Textarea
          label="Deskripsi"
          withAsterisk
          placeholder="Masukan deskripsi kabar"
          onChange={(val) => {
            setKabar({
              ...kabar,
              deskripsi: val.target.value,
            });
          }}
        />
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={imageKabar ? imageKabar : "/aset/no-img.png"}
              />
            </Paper>
          </AspectRatio>
          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  // console.log(buffer, "ini buffer");
                  // console.log(files, " ini file");
                  setImageKabar(buffer);
                  setFile(files);
                } catch (error) {
                  console.log(error);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  radius={"xl"}
                  variant="outline"
                  w={150}
                  leftIcon={<IconCamera />}
                  compact
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>
        <Button
          radius={"xl"}
          mt={"lg"}
          onClick={() => onSave(router, donasiId, kabar, file as any)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

interface Model_Kabar {
  judul: string;
  deskripsi: string;
}

async function onSave(
  router: AppRouterInstance,
  donasiId: string,
  kabar: Model_Kabar,
  file: FormData
) {
  const body = {
    donasiId: donasiId,
    title: kabar.judul,
    deskripsi: kabar.deskripsi,
  };

  if (_.values(body).includes("")) return NotifPeringatan("Lengkapi Data");
  // if (!file) return NotifPeringatan("Lengkapi Gambar");

  const gambar = new FormData();
  gambar.append("file", file as any);

  await Donasi_funCreateKabar(body as any, gambar).then(async (res) => {
    if (res.status === 200) {
      await Donasi_funCreateNotif(body.donasiId, res.kabarId as any).then(
        (val) => {
          if (val.status === 200) {
            ComponentGlobal_NotifikasiBerhasil(res.message);
            router.back();
          }
        }
      );
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
