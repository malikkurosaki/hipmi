"use client";

import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import ComponentAdminDonasi_TombolKembali from "../../component/tombol_kembali";
import { useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import ComponentDonasi_NotedBox from "@/app_modules/donasi/component/noted_box";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_DONASI_PENCAIRAN_DANA } from "@/app_modules/donasi/model/interface";
import _ from "lodash";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import { AdminDonasi_funCreatePencairanDana } from "../../fun/create/fun_create_pencairan_dana";
import { NotifBerhasil } from "@/app_modules/donasi/component/notifikasi/notif_berhasil";
import { NotifGagal } from "@/app_modules/donasi/component/notifikasi/notif_gagal";
import { AdminDonasi_AkumulasiPencairanById } from "../../fun/update/fun_update_akumulasi_pencairan";

export default function AdminDonasi_PencairanDana({
  donasiId,
}: {
  donasiId: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();
  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    nilai: "",
  });
  return (
    <>
      <Stack>
        <ComponentAdminDonasi_TombolKembali />
        <Center>
          <Paper
            p={"md"}
            w={{ base: 200, sm: 200, md: 300, lg: 400 }}
            withBorder
          >
            <Center mb={"lg"}>
              <Title order={5}>Form Pencairan Dana</Title>
            </Center>
            <Stack>
              <TextInput
                withAsterisk
                type="number"
                placeholder="Masukan jumlah nominal"
                label="Nominal"
                onChange={(val) => {
                  setValue({
                    ...value,
                    nilai: val.target.value,
                  });
                }}
              />
              <TextInput
                withAsterisk
                placeholder="Masukan judul"
                label="Judul"
                onChange={(val: any) => {
                  setValue({
                    ...value,
                    title: val.target.value,
                  });
                }}
              />
              <Textarea
                withAsterisk
                placeholder="Masukan deskripsi"
                label="Deskripsi"
                onChange={(val: any) => {
                  setValue({
                    ...value,
                    deskripsi: val.target.value,
                  });
                }}
              />

              <ComponentDonasi_NotedBox informasi="Wajib menyertakan bukti transfer" />
              <Stack>
                <Center>
                  <FileButton
                    onChange={async (files: any | null) => {
                      try {
                        const buffer = URL.createObjectURL(
                          new Blob([new Uint8Array(await files.arrayBuffer())])
                        );
                        // console.log(buffer, "ini buffer");
                        // console.log(files, " ini file");
                        setImages(buffer);
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
                {images ? (
                  <AspectRatio ratio={9 / 16}>
                    <Paper radius={"md"} withBorder>
                      <Image
                        alt="Foto"
                        src={images}
                      />
                    </Paper>
                  </AspectRatio>
                ) : (
                  ""
                )}
              </Stack>
              <Button
                radius={"xl"}
                mt={"lg"}
                onClick={
                  () => onSave(router, value, donasiId, file as any)
                  // console.log(value)
                }
              >
                Simpan
              </Button>
            </Stack>
          </Paper>
        </Center>
      </Stack>
    </>
  );
}

async function onSave(
  router: AppRouterInstance,
  value: any,
  donasiId: string,
  file: FormData
) {
  const body = {
    donasiId: donasiId,
    nominalCair: value.nilai,
    title: value.title,
    deskripsi: value.deskripsi,
  };

  //   console.log(body);

  if (_.values(body).includes("")) return NotifPeringatan("Lengkapi Data");
  if (!file) return NotifPeringatan("Lampirkan Bukti Transfer");

  const gambar = new FormData();
  gambar.append("file", file as any);

  await AdminDonasi_funCreatePencairanDana(body as any, gambar).then(
    async (res) => {
      if (res.status === 200) {
        await AdminDonasi_AkumulasiPencairanById(
          body.donasiId as any,
          body.nominalCair as any
        ).then((res) => {
          if (res.status === 200) {
            NotifBerhasil(res.message);
            router.back();
          } else {
            NotifGagal(res.message);
          }
        });
      } else {
        NotifGagal(res.message);
      }
    }
  );
}
