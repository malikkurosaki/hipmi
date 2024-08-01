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
import { useState } from "react";
import _ from "lodash";
import funGantiStatusInvestasi from "../../fun/fun_ganti_status";
import { ComponentInvestasi_DetailDataNonPublish } from "../../component/detail/detai_data_non_publish";
import { MainColor } from "@/app_modules/_global/color/color_pallet";

export default function DetailDraftInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  // const [investasi, setInvestasi] = useState<MODEL_Investasi>(dataInvestasi);

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
    await funGantiStatusInvestasi(dataInvestasi.id, "2")
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
      {/* <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
          />
        </AspectRatio>
      </Paper>

      <Center>
        <Title order={4} mb={"xs"}>
          {_.capitalize(investasi.title)}
        </Title>
      </Center>

     
      <Grid p={"md"} mb={"md"}>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>Dana Dibutuhkan</Text>
              <Text>Rp. {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.targetDana)}</Text>
            </Box>
            <Box>
              <Text>Harga Per Lembar</Text>
              <Text>Rp. {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.hargaLembar)}</Text>
            </Box>
            <Box>
              <Text>Jadwal Pembagian</Text>
              <Text>{investasi.MasterPembagianDeviden.name} bulan </Text>
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
              <Text>{new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.totalLembar)} lembar</Text>
            </Box>
            <Box>
              <Text>Pembagian Deviden</Text>
              <Text>{investasi.MasterPeriodeDeviden.name}</Text>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid> */}

      <Stack mb={"lg"}>
        <ComponentInvestasi_DetailDataNonPublish data={dataInvestasi} />
        <Stack>
          <Button
            radius={50}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => onsubmit()}
          >
            Ajukan Review
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
