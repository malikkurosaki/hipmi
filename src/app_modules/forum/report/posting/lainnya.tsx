"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreateReportPosting } from "../../fun/create/fun_create_report_posting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { forum_funCreateReportPostingLainnya } from "../../fun/create/fun_create_report_posting_lainnya";

export default function Forum_ReportPostingLainnya({
  postingIg,
}: {
  postingIg: string;
}) {
  const [deskripsi, setDeskripsi] = useState("");
  return (
    <>
      <Stack>
        <Textarea
          label={"Kirimkan Laporan"}
          placeholder="Ketik laporan anda tentang postingan ini ..."
          minRows={5}
          onChange={(val) => {
            setDeskripsi(val.currentTarget.value);
          }}
        />
        <ButtonAction postingIg={postingIg} deskripsi={deskripsi} />
      </Stack>
    </>
  );
}

function ButtonAction({
  postingIg,
  deskripsi,
}: {
  postingIg: string;
  deskripsi: string;
}) {
  const router = useRouter();

  async function onReport() {
    await forum_funCreateReportPostingLainnya(postingIg, deskripsi).then(
      (res) => {
        if (res.status === 201) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }
  return (
    <>
      <Group position="apart" grow>
        <Button
          radius={"xl"}
          onClick={() => router.replace(RouterForum.report_posting + postingIg)}
        >
          Batal
        </Button>
        <Button
        style={{
          transition: "0.5s"
        }}
          disabled={deskripsi === "" ? true : false}
          radius={"xl"}
          color="orange"
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Group>
    </>
  );
}
