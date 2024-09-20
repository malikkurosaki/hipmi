"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";
import { portofolio_funEditLogoBisnisById } from "../../fun";

export function ComponentPortofolio_ButtonEditLogoBisnis({
  file,
  portofolioId,
}: {
  file: File;
  portofolioId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onUpdate() {
    const uploadFileToStorage = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.portofolio_logo,
    });

    if (!uploadFileToStorage.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

    const res = await portofolio_funEditLogoBisnisById({
      portofolioId: portofolioId,
      logoId: uploadFileToStorage.data.id,
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
      {file ? (
        <Button
          loaderPosition="center"
          loading={loading ? true : false}
          radius={"xl"}
          onClick={() => onUpdate()}
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
        <Button disabled radius={"xl"}>
          Simpan
        </Button>
      )}
    </>
  );
}
