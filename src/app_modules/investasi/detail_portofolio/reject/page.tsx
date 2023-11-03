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
  Divider,
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

export default function DetailRejectInvestasi() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_TabPortoInvestasi);

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

  async function onAjukan() {
    toast("Project Diajukan Kembali");
    router.push(RouterInvestasi.portofolio);
    setActiveTab("Review");
  }

  async function onBatal() {
    toast("Project Dibatalkan");
    router.push(RouterInvestasi.portofolio);
    setActiveTab("Reject");
    
  }

  return (
    <>
      {/* Alasan */}
      <Box mb={"sm"}>
        <Title order={6}>Alasan :</Title>
        <Box>
          <Paper>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              necessitatibus dolores, doloribus porro quis velit unde voluptatem
              delectus, nesciunt laboriosam non quae numquam sed tenetur! Minus
              earum odio possimus dolore?
            </Text>
          </Paper>
        </Box>
      </Box>

      {/* Tombol Ajukan */}
      <Grid>
        <Grid.Col span={6}>
          <Center>
            <Button
              mb={"xl"}
              radius={50}
              bg={"orange.7"}
              color="yellow"
              onClick={() => onAjukan()}
            >
              Ajukan Kembali
            </Button>
          </Center>
        </Grid.Col>

        <Grid.Col span={6}>
          <Center>
            {" "}
            <Button
              mb={"xl"}
              radius={50}
              bg={"red.7"}
              color="yellow"
              onClick={() => onBatal()}
            >
              Batalkan Project
            </Button>
          </Center>
        </Grid.Col>
      </Grid>

      <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image alt="" src={"/aset/no-img.png"} />
        </AspectRatio>
      </Paper>


      {/* Title dan Persentase */}
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
          Judul Proyek
        </Title>
        <Slider
          disabled
          size={10}
          value={60}
          marks={[{ value: 60, label: "60%" }]}
        />
      </Box>

      {/* Rincian Data */}
      <Grid p={"md"} mb={"md"}>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>Dana Dibutuhkan</Text>
              <Text>Rp. </Text>
            </Box>
            <Box>
              <Text>Harga Per Lembar</Text>
              <Text>Rp. </Text>
            </Box>
            <Box>
              <Text>Jadwal Pembagian</Text>
              <Text>3 Bulan </Text>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>ROI</Text>
              <Text>%</Text>
            </Box>
            <Box>
              <Text>Total Lembar</Text>
              <Text>0</Text>
            </Box>
            <Box>
              <Text>Pembagian Deviden</Text>
              <Text>Selamanya</Text>
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
            onClick={() => router.push(e.route + `${"1"}`)}
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

      
    </>
  );
}
