"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";

import { map_funEditMap } from "../../fun/edit/fun_edit_map";
import { MODEL_MAP } from "../../lib/interface";
import { useRouter } from "next/navigation";
import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { useState } from "react";

export function ComponentMap_ButtonUpdateDataMap({
  data,
  file,
}: {
  data: MODEL_MAP;
  file: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function onSavePin() {
    if (file !== null) {
      const uploadFileToStorage = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.map_image,
      });
      if (!uploadFileToStorage.success)
        return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

      const res = await map_funEditMap({
        data: data,
        fileId: uploadFileToStorage.data.id,
      });
      res.status === 200
        ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
        : ComponentGlobal_NotifikasiGagal(res.message);
    } else {
      const res = await map_funEditMap({
        data: data,
      });
      res.status === 200
        ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
        : ComponentGlobal_NotifikasiGagal(res.message);
    }
    setIsLoading(true);
  }

  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading}
        mb={"xl"}
        style={{ transition: "0.5s" }}
        disabled={data.namePin === "" ? true : false}
        radius={"xl"}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => onSavePin()}
      >
        Simpan
      </Button>
    </>
  );
}
