"use client";

import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MODEL_PROFILE } from "../../model/interface";
import { IconCamera } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Profile_funUpdateFoto } from "../../fun/update/fun_update_foto_profile";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function UploadFotoProfile({
  dataProfile,
}: {
  dataProfile: MODEL_PROFILE;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(dataProfile);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);

  return (
    <>
      <Stack spacing={"xl"}>
        <Paper p={"sm"} withBorder radius={"sm"} shadow="">
          <Stack>
            <AspectRatio ratio={1 / 1}>
              <Image
                alt="Foto"
                src={
                  image
                    ? image
                    : RouterProfile.api_foto_profile + profile.imagesId
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
          onClick={() => onUpdate(router, profile.id, file as any)}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  profileId: string,
  file: FormData
) {
  const gambar = new FormData();
  gambar.append("file", file as any);

  await Profile_funUpdateFoto(profileId, gambar).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
