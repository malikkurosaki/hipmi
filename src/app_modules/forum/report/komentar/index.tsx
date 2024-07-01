"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import mqtt_client from "@/util/mqtt_client";
import { Button, Radio, Stack, Text, Title } from "@mantine/core";
import { toNumber } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreateReportKomentar } from "../../fun/create/fun_create_report_komentar";
import forum_funCreateNotifikasiToAdmin from "../../fun/forum_notifikasi/fun_create_notifikasi";

import { MODEL_FORUM_MASTER_REPORT } from "../../model/interface";
import forum_getOneKategoriById from "../../fun/get/get_one_kategori_by_id";
import getMaster_NamaBank from "@/app_modules/investasi/fun/master/get_nama_bank";

export default function Forum_ReportKomentar({
  komentarId,
  listReport,
  userLoginId,
}: {
  komentarId: string;
  listReport: MODEL_FORUM_MASTER_REPORT[];
  userLoginId: string;
}) {
  const [reportValue, setReportValue] = useState("Kebencian");

  return (
    <>
      <Stack px={"sm"}>
        <Radio.Group
          value={reportValue as any}
          onChange={(val) => {
            setReportValue(val);
          }}
        >
          <Stack spacing={"xl"}>
            {listReport.map((e) => (
              <Stack key={e.id}>
                <Radio
                  value={e.title}
                  label={<Title order={5}>{e.title}</Title>}
                />
                <Text>{e.deskripsi}</Text>
              </Stack>
            ))}
          </Stack>
        </Radio.Group>
        <ButtonAction
          kategoriId={reportValue}
          komentarId={komentarId}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  kategoriId,
  komentarId,
  userLoginId,
}: {
  kategoriId: string;
  komentarId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onReport() {
    const report = await forum_funCreateReportKomentar({
      komentarId: komentarId,
      kategoriId: kategoriId,
    });

    if (report.status === 201) {
      ComponentGlobal_NotifikasiBerhasil(report.message, 2000);
      setLoading(true);
      router.back();

      // const get = await getMaster_NamaBank();
      // console.log(get);

      // await forum_getOneKategoriById({
      //   kategoriId: kategoriId,
      // });

      // console.log(getKategori);

      // const dataNotif = {
      //   appId: komentarId,
      //   pesan: getKategori?.deskripsi,
      //   kategoriApp: "FORUM",
      //   title: getKategori?.title,
      //   userId: userLoginId,
      //   status: "Report Komentar",
      // };

      // const createNotif = await forum_funCreateNotifikasiToAdmin({
      //   data: dataNotif as any,
      // });

      // if (createNotif.status === 201) {
      //   mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      // }
    } else {
      ComponentGlobal_NotifikasiGagal(report.message);
    }
  }
  return (
    <>
      <Stack mt={"md"}>
        <Button
          radius={"xl"}
          onClick={() =>
            router.replace(RouterForum.report_komentar_lainnya + komentarId)
          }
        >
          Lainnya
        </Button>
        <Button
          radius={"xl"}
          color="orange"
          loaderPosition="center"
          loading={loading ? true : false}
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Stack>
    </>
  );
}
