"use client";

import {
  RouterPortofolio
} from "@/app/lib/router_hipmi/router_katalog";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Portofolio_funEditLogoBisnisById } from "../../fun/edit/fun_edit_logo_bisnis_by_id";
import { MODEL_PORTOFOLIO } from "../../model/interface";

export default function Portofolio_EditLogoBisnis({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        <Paper
          p={"sm"}
          style={{
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px ",
            padding: "15px",
            color: "white",
          }}
        >
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
                    leftIcon={<IconCamera />}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Upload
                  </Button>
                )}
              </FileButton>
            </Center>
          </Stack>
        </Paper>

        {file ? (
          <Button
            radius={"xl"}
            onClick={() =>
              // onUpdate(router, dataPorto.id, file as any, setLoading)
              console.log("apa")
            }
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            style={{
              transition: "0.5s",
              border: `1px solid ${AccentColor.yellow}`,
            }}
          >
            Simpan
          </Button>
        ) : (
          <Button
            disabled
            radius={"xl"}
           
          >
            Simpan
          </Button>
        )}
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  portoId: string,
  file: FormData,
  setLoading: any
) {
  const gambar = new FormData();
  gambar.append("file", file as any);

  await Portofolio_funEditLogoBisnisById(portoId, gambar).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
