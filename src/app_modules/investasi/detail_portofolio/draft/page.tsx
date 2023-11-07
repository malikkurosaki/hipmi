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
import { gs_TabPortoInvestasi } from "../../g_state";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../../model/model_investasi";
import { useState } from "react";
import _ from "lodash";
import funGantiStatusInvestasi from "../../fun/fun_ganti_status";

export default function DetailDraftInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_TabPortoInvestasi);
  const [investasi, setInvestasi] = useState<MODEL_Investasi>(dataInvestasi);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.edit_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.edit_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: RouterInvestasi.edit_berita,
    },
  ];

  async function onsubmit() {
    await funGantiStatusInvestasi(investasi.id, "2")
      .then((res) => res)
      .then((val) => {
        if (val.status === 200) {
          toast("Review Berhasil Diajukan");
          router.push(RouterInvestasi.portofolio);
          setActiveTab("Review");
        } else {
          toast("Error");
        }
      });
  }

  return (
    <>
      <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
          />
        </AspectRatio>
      </Paper>

      {/* Title dan Persentase */}
      <Center>
        <Title order={4} mb={"xs"}>
          {investasi.title}
        </Title>
      </Center>

      {/* Rincian Data */}
      <Grid p={"md"} mb={"md"}>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>Dana Dibutuhkan</Text>
              <Text>Rp. {investasi.targetDana}</Text>
            </Box>
            <Box>
              <Text>Harga Per Lembar</Text>
              <Text>Rp. {investasi.hargaLembar}</Text>
            </Box>
            <Box>
              <Text>Jadwal Pembagian</Text>
              <Text>{investasi.MasterPembagianDeviden.name} bulan </Text>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>ROI</Text>
              <Text>{investasi.roi}%</Text>
            </Box>
            <Box>
              <Text>Total Lembar</Text>
              <Text>{investasi.totalLembar} lembar</Text>
            </Box>
            <Box>
              <Text>Pembagian Deviden</Text>
              <Text>{investasi.MasterPeriodeDeviden.name}</Text>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>

      <Center>
        <Button
          w={300}
          radius={50}
          bg={"yellow.7"}
          color="yellow"
          onClick={() => onsubmit()}
        >
          Ajukan Review
        </Button>
      </Center>
    </>
  );
}
