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
  Progress,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBookDownload,
  IconCircleCheck,
  IconFileDescription,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_Investasi } from "../model/model_investasi";
import moment from "moment";
import { MODEL_User_profile } from "@/app_modules/models/user_profile";
import { RouterUserProfile } from "@/app/lib/router_hipmi/router_user_profile";

export default function DetailInvestasi({
  dataInvestasi,
  dataUser,
}: {
  dataInvestasi: MODEL_Investasi;
  dataUser: MODEL_User_profile;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [user, setUser] = useState(dataUser);

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

  return (
    <>
      {/* Foto username dan sisa waktu */}
      <Group position="apart" mb={"md"}>
        <Flex align={"center"} gap={"xs"}>
          <Avatar
            radius={50}
            src={
              RouterUserProfile.api_foto + `${user.Profile?.ImageProfile?.url}`
            }
          />
          <Text>{user.username}</Text>
        </Flex>
        {Number(investasi.MasterPencarianInvestor.name) -
          moment(new Date()).diff(new Date(investasi.updatedAt), "days") <=
        0 ? (
          <Group position="right">
            <IconCircleCheck color="green" />
            <Text c={"green"}>Selesai</Text>
          </Group>
        ) : (
          <Group position="right" spacing={"xs"}>
            <Text>Sisa waktu:</Text>
            <Text>
              {Number(investasi.MasterPencarianInvestor.name) -
                moment(new Date()).diff(new Date(investasi.updatedAt), "days")}
            </Text>
            <Text>Hari</Text>
          </Group>
        )}
      </Group>

      <Paper withBorder mb={"md"} p={"xs"}>
        <AspectRatio ratio={16 / 9}>
          <Image   alt="" src={RouterInvestasi.api_gambar + `${investasi.imagesId}`} />
        </AspectRatio>
      </Paper>

      {/* Title dan Progress */}
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
          {investasi.title}
        </Title>
        <Progress label="0%" value={0} color="teal" size="xl" radius="xl"  animate/>
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

      <Center mb={"md"}>
        <Button
          radius={50}
          w={350}
          bg={Warna.biru}
          onClick={() => router.push("/dev/investasi/proses_investasi")}
        >
          Investasi
        </Button>
      </Center>
    </>
  );
}
