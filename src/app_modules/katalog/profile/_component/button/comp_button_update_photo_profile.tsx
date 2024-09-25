"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Box, Button, Center } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { profile_funUpdatePhoto } from "../../fun";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";

export function Profile_ComponentButtonUpdatePhotoProfile({
  file,
  profileId,
}: {
  file: File;
  profileId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  async function onUpdate() {
    const uploadPhoto = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.profile_foto,
    });
    if (!uploadPhoto.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload foto profile");

    const res = await profile_funUpdatePhoto({
      fileId: uploadPhoto.data.id,
      profileId: profileId,
    });
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            transition: "all 0.3s ease",
            position: "absolute",
            bottom: 20,
            width: 300,
          }}
          disabled={file ? false : true}
          loading={isLoading ? true : false}
          loaderPosition="center"
          radius={"xl"}
          onClick={() => {
            onUpdate();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
