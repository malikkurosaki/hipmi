"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Button,
  Stack
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import { MainColor } from "@/app_modules/_global/color/color_pallet";

export default function DetailReviewDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataDonasi);

  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={donasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
        <ButtonBatalReview donasi={donasi} />
      </Stack>
    </>
  );
}
function ButtonBatalReview({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onCLick() {
    await Donasi_funGantiStatus(donasi.id, "3").then((res) => {
      if (res.status === 200) {
        setTabsPostingDonasi("Draft");
        NotifBerhasil("Berhasil Dibatalkan");
        setLoading(true);
        router.push(RouterDonasi.main_galang_dana);
      } else {
        NotifPeringatan(res.message);
      }
    });
  }
  return (
    <>
      <Button
        style={{
          transition: "0.5s",
        }}
        loaderPosition="center"
        loading={isLoading ? true : false}
        radius={"xl"}
        bg={"orange"}
        color="orange"
        onClick={() => onCLick()}
      >
        Batalkan Review
      </Button>
    </>
  );
}
