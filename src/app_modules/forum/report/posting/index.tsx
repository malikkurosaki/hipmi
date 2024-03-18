"use client";

import { Box, Button, Paper, Radio, Stack, Text, Title } from "@mantine/core";
import { MODEL_FORUM_REPORT } from "../../model/interface";
import { useState } from "react";
import { forum_funCreateReportPosting } from "../../fun/create/fun_create_report_posting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";

export default function Forum_ReportPosting({
  postingId,
  listReport,
}: {
  postingId: string;
  listReport: MODEL_FORUM_REPORT[];
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
        <ButtonAction value={reportValue} postingId={postingId} />
      </Stack>
    </>
  );
}

function ButtonAction({
  value,
  postingId,
}: {
  value: string;
  postingId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onReport() {
    await forum_funCreateReportPosting(postingId, value).then((res) => {
      if (res.status === 201) {
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        setLoading(true);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Stack mt={"md"}>
        <Button
          radius={"xl"}
          onClick={() => router.replace(RouterForum.report_posting_lainnya + postingId)}
        >
          Lainnya
        </Button>
        <Button
          radius={"xl"}
          color="red"
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
