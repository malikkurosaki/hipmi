"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBookDownload,
  IconFileDescription,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_StatusPortoInvestasi } from "../../g_state";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../../model/model_investasi";
import funGantiStatusInvestasi from "../../fun/fun_ganti_status";
import { useState } from "react";
import _ from "lodash";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentInvestasi_DetailDataNonPublish } from "../../component/detail/detai_data_non_publish";

export default function DetailReviewInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [data, setData] = useState<MODEL_Investasi>(dataInvestasi);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.detail_dokumen,
    },
    // {
    //   id: 3,
    //   name: "Berita",
    //   icon: <IconSpeakerphone size={70} />,
    //   route: RouterInvestasi.berita,
    // },
  ];

  async function onsubmit() {
    await funGantiStatusInvestasi(data.id, "1").then((val) => {
      if (val.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Review Dibatalkan");
        router.push(RouterInvestasi.portofolio);
        setActiveTab("Draft");
      } else {
        ComponentGlobal_NotifikasiPeringatan("Error");
      }
    });
  }

  return (
    <>
      <Stack spacing={"xl"} mb={"lg"}>
        <ComponentInvestasi_DetailDataNonPublish data={data} />
        {/* Tombol Ajukan */}
        <Stack>
          <Button
            style={{
              transition: "0.5s",
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={50}
            bg={"orange"}
            color="yellow"
            onClick={() => onsubmit()}
          >
            Batalkan Review
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
