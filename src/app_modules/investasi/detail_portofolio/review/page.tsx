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

export default function DetailReviewInvestasi({dataInvestasi}:{dataInvestasi: MODEL_Investasi}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [investasi,setInvestasi] = useState<MODEL_Investasi>(dataInvestasi)

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
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: RouterInvestasi.berita,
    },
  ];

  async function onsubmit() {
    await funGantiStatusInvestasi(investasi.id, "1")
      .then((res) => res)
      .then((val) => {
        if (val.status === 200) {
          toast("Review Dibatalkan");
          router.push(RouterInvestasi.portofolio);
          setActiveTab("Draft");
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
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
          {investasi.title}
        </Title>
      </Box>

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
              <Text>{investasi.MasterPembagianDeviden.name} Bulan </Text>
            </Box>
            <Box>
              <Text>Pencarian Investor</Text>
              <Text>{investasi.MasterPencarianInvestor.name} Hari </Text>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>ROI</Text>
              <Text>{investasi.roi} %</Text>
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

      {/* List Box */}
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col
            span={"auto"}
            key={e.id}
            onClick={() => router.push(e.route + `${investasi.id}`)}
          >
            <Paper h={100} w={100} bg={"gray.4"} withBorder py={"xs"}>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text fz={12}>{e.name}</Text>
                <ActionIcon variant="transparent" size={60}>
                  {e.icon}
                </ActionIcon>
              </Flex>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>

      {/* Tombol Ajukan */}
      <Center>
        <Button
          w={300}
          mb={"xl"}
          radius={50}
          bg={"red.7"}
          color="yellow"
          onClick={() => onsubmit()}
        >
          Batalkan Review
        </Button>
      </Center>
    </>
  );
}
