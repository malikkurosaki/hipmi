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
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { Profile_funUpdateBackground } from "../../fun/update/fun_update_background";

export default function Profile_UpdateFotoBackground({
  dataProfile,
}: {
  dataProfile: MODEL_PROFILE;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(dataProfile);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xl"}>
        <Paper p={"sm"} withBorder radius={"sm"} shadow="">
          <Stack>
            <AspectRatio ratio={16 / 9}>
              <Image
                alt="Foto"
                src={
                  image
                    ? image
                    : RouterProfile.api_background_profile +
                      profile.imagesBackgroundId
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
                    if (files.size > 1000000) {
                      ComponentGlobal_NotifikasiPeringatan(
                        "Maaf, Ukuran file terlalu besar, maximum 1mb",
                        3000
                      );
                    } else {
                      setImage(buffer);
                      setFile(files);
                    }
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
          disabled={file ? false : true}
          loading={loading ? true : false}
          loaderPosition="center"
          radius={"xl"}
          onClick={() => onUpdate(router, profile.id, file as any, setLoading)}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  profileId: string,
  file: FormData,
  setLoading: any
) {
  const gambar = new FormData();
  gambar.append("file", file as any);

  await Profile_funUpdateBackground(profileId, gambar).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
