"use client";

import { NEW_RouterInvestasi, RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Investasi_ComponentDetailDataNonPublish } from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { investasi_funEditStatusById } from "@/app_modules/investasi/fun/edit/fun_edit_status_by_id";
import { gs_investasi_status } from "@/app_modules/investasi/g_state";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Investasi_ViewDetailReview({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [data, setData] = useState<MODEL_INVESTASI>(dataInvestasi);

  async function onCancleReview() {
    const res = await investasi_funEditStatusById({
      investasiId: data.id,
      statusId: "3",
    });
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        status: res.data?.MasterStatusInvestasi?.name,
        kategoriApp: "INVESTASI",
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));

        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Review Dibatalkan");
        setActiveTab("Draft");
        router.push(NEW_RouterInvestasi.portofolio({id: data.id}));
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <Investasi_ComponentDetailDataNonPublish data={data} />
        {/* Tombol Ajukan */}
        <Stack>
          <Button
            mb={"xl"}
            style={{
              transition: "0.5s",
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={50}
            bg={"orange"}
            color="yellow"
            onClick={() => onCancleReview()}
          >
            Batalkan Review
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
