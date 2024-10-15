"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import mqtt_client from "@/util/mqtt_client";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funCreateNewInvestasi } from "../../_fun";
import { gs_investas_menu, gs_investasi_status } from "../../g_state";

export function Investasi_ComponentButtonCreateNewInvestasi({
  data,
  totalLembar,
  fileImage,
  filePdf,
}: {
  data: any;
  totalLembar: number;
  fileImage: File;
  filePdf: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);

  async function onSubmit() {
    setIsLoading(true);
    const body = {
      title: data.title,
      targetDana: data.targetDana,
      hargaLembar: data.hargaLembar,
      totalLembar: totalLembar,
      roi: data.roi,
      masterPeriodeDevidenId: data.periodeDevidenId,
      masterPembagianDevidenId: data.pembagianDevidenId,
      masterPencarianInvestorId: data.pencarianInvestorId,
    };

    const uploadImage = await funGlobal_UploadToStorage({
      file: fileImage,
      dirId: DIRECTORY_ID.investasi_image,
    });
    if (!uploadImage.success) {
      setIsLoading(false);
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
    }

    const uploadFilePdf = await funGlobal_UploadToStorage({
      file: filePdf,
      dirId: DIRECTORY_ID.investasi_prospektus,
    });
    if (!uploadFilePdf.success) {
      setIsLoading(false);
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
    }

    const res = await investasi_funCreateNewInvestasi({
      data: body as any,
      fileImageId: uploadImage.data.id,
      filePdfId: uploadFilePdf.data.id,
    });

    if (res.status === 201) {
      const dataNotif = {
        appId: res.data?.id,
        status: res.data?.MasterStatusInvestasi?.name,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        kategoriApp: "INVESTASI",
        title: "Investasi baru",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "ADMIN",
          JSON.stringify({
            count: 1,
          })
        );
        setActiveTab("Review");
        setHotMenu(1);
        setIsLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(NEW_RouterInvestasi.portofolio({ id: "2" }));
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Button
        my={"xl"}
        style={{
          transition: "0.5s",
        }}
        loaderPosition="center"
        loading={isLoading ? true : false}
        disabled={
          data.title === "" ||
          data.hargaLembar === 0 ||
          data.targetDana === 0 ||
          data.roi === 0 ||
          data.pencarianInvestorId === "" ||
          data.periodeDevidenId === "" ||
          data.pembagianDevidenId === "" ||
          fileImage === null ||
          filePdf === null
            ? true
            : false
        }
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => onSubmit()}
      >
        Simpan
      </Button>
    </>
  );
}
