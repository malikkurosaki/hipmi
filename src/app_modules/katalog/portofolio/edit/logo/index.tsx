"use client";

import {
  RouterPortofolio,
  RouterProfile,
} from "@/app/lib/router_hipmi/router_katalog";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { profile } from "console";
import image from "next/image";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import { MODEL_PORTOFOLIO } from "../../model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Portofolio_funEditLogoBisnisById } from "../../fun/edit/fun_edit_logo_bisnis_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function Portofolio_EditLogoBisnis({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);
  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        <Paper p={"sm"} withBorder radius={"sm"} shadow="lg">
          <Stack>
            <AspectRatio ratio={1 / 1}>
              <Image
                alt="Foto"
                src={
                  image
                    ? image
                    : RouterPortofolio.api_logo_porto + `${dataPorto.logoId}`
                }
              />
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
                    setImage(buffer);
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
        </Paper>

        <Button
          radius={"xl"}
          onClick={() => onUpdate(router, dataPorto.id, file as any)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  portoId: string,
  file: FormData
) {
  const gambar = new FormData();
  gambar.append("file", file as any);

  await Portofolio_funEditLogoBisnisById(portoId, gambar).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
