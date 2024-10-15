"use client";

import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Investasi_ComponentDetailDataNonPublish } from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { ComponentInvestasi_DetailDataNonPublish } from "@/app_modules/investasi/component/detail/x_detai_data_non_publish";
import { investasi_funEditStatusById } from "@/app_modules/investasi/fun/edit/fun_edit_status_by_id";
import { gs_investasi_status } from "@/app_modules/investasi/g_state";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Investasi_ViewDetailDraft({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);

  async function onAjukanReview() {
    const res = await investasi_funEditStatusById({
      investasiId: dataInvestasi.id,
      statusId: "2",
    });

    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        status: res.data?.MasterStatusInvestasi?.name,
        kategoriApp: "INVESTASI",
        title: "Mengajukan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));

        setIsLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Review Berhasil Diajukan");
        router.push(NEW_RouterInvestasi.portofolio({ id: dataInvestasi.id }));
        setActiveTab("Review");
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack mb={"lg"}>
        {dataInvestasi.catatan && (
          <ComponentGlobal_BoxInformation
            informasi={dataInvestasi.catatan}
            isReport
          />
        )}
        <Investasi_ComponentDetailDataNonPublish data={dataInvestasi} />

        <Stack>
          <Button
            loaderPosition="center"
            loading={isLoading}
            radius={50}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => onAjukanReview()}
          >
            Ajukan Review
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
