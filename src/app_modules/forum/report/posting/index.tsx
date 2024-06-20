"use client";

import { Box, Button, Paper, Radio, Stack, Text, Title } from "@mantine/core";
import { MODEL_FORUM_MASTER_REPORT } from "../../model/interface";
import { useState } from "react";
import { forum_funCreateReportPosting } from "../../fun/create/fun_create_report_posting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import mqtt_client from "@/util/mqtt_client";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";

export default function Forum_ReportPosting({
  postingId,
  listReport,
  userLoginId,
}: {
  postingId: string;
  listReport: MODEL_FORUM_MASTER_REPORT[];
  userLoginId: string;
}) {
  const [reportValue, setReportValue] = useState("Kebencian");

  return (
    <>
      <Stack px={"sm"}>
        <Radio.Group value={reportValue as any} onChange={setReportValue}>
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
          value={reportValue}
          postingId={postingId}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  value,
  postingId,
  userLoginId,
}: {
  value: string;
  postingId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onReport() {
    const report = await forum_funCreateReportPosting(postingId, value);
    if (report.status === 201) {
      ComponentGlobal_NotifikasiBerhasil(report.message, 2000);
      setLoading(true);
      router.back();

      // const dataNotif = {
      //   appId: postingId,
      //   pesan: value,
      //   kategoriApp: "FORUM",
      //   title: "Report Posting",
      //   userId: userLoginId,
      // };

      // const notif = await notifikasiToAdmin_funCreate({
      //   data: dataNotif as any,
      // });

      // if (notif.status === 201) {
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
            router.replace(RouterForum.report_posting_lainnya + postingId)
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
