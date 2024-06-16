"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Progress,
  Grid,
  Group,
  Divider,
  ActionIcon,
  Avatar,
  Text,
  Image,
  Button,
} from "@mantine/core";
import {
  IconClover,
  IconMail,
  IconMoneybag,
  IconCircleChevronRight,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../../component/noted_box";
import { useAtom } from "jotai";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";

export default function DetailReviewDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataDonasi);

  return (
    <>
      <Stack spacing={"xl"}>
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
        bg={"red"}
        color="red"
        onClick={() => onCLick()}
      >
        Batalkan Review
      </Button>
    </>
  );
}
