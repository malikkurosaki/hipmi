"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import {
  Button,
  Stack
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentInvestasi_DetailDataNonPublish } from "../../component/detail/detai_data_non_publish";
import { investasi_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { gs_investasi_status } from "../../g_state";
import { MODEL_Investasi } from "../../model/model_investasi";
export default function DetailDraftInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
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
        router.push(RouterInvestasi.portofolio);
        setActiveTab("Review");
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack mb={"lg"}>
        {dataInvestasi.catatan && <ComponentGlobal_BoxInformation informasi={dataInvestasi.catatan} isReport/>}
        <ComponentInvestasi_DetailDataNonPublish data={dataInvestasi} />
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