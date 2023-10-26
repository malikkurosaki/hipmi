"use client";

import { RouteInvestasi } from "@/app/lib/app_route";
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
import { useRouter } from "next/navigation";

export default function DetailSahamTerbeli({id}: {id: string}) {
  const router = useRouter();
  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouteInvestasi.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouteInvestasi.detail_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: RouteInvestasi.detail_berita,
    },
  ];
  return (
    <>
      <Group position="apart" mb={"md"}>
        <Flex align={"center"} gap={"xs"}>
          <Avatar src={"/aset/avatar.png"} />
          <Text>Username</Text>
        </Flex>
        <Text>Sisa waktu : 20 Hari</Text>
      </Group>

      {/* Gambar Investasi */}
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
      <Grid p={"md"}>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>Terkumpul</Text>
              <Text>Rp. </Text>
            </Box>
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
              <Text>Investor</Text>
              <Text>4657</Text>
            </Box>
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

      <Divider my={"md"} />

      {/* Saham Terbeli */}
      <Box>
        <Center>
          <Title order={5}>Saham Anda</Title>
        </Center>
        <Grid p={"md"}>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Total Pembelian</Text>
                <Text>Rp. 0</Text>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Lembar Dibeli</Text>
                <Text>100</Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      {/* List Box */}
      <Grid mb={"sm"} justify="center">
        {listBox.map((e) => (
          <Grid.Col span={"auto"} key={e.id} onClick={() => router.push(e.route + `${id}`)}>
            <Center>
              <Paper h={100} w={100} bg={"gray.4"} withBorder py={"xs"}>
                <Flex direction={"column"} align={"center"} justify={"center"}>
                  <Text fz={12}>{e.name}</Text>
                  <ActionIcon variant="transparent" size={60}>
                    {e.icon}
                  </ActionIcon>
                </Flex>
              </Paper>
            </Center>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
