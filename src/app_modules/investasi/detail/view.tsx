"use client";

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
import { useRouter } from "next/navigation";

export default function DetailInvestasi() {
  const router = useRouter();
  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: "",
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: "",
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: "",
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

      {/* List Box */}
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col span={"auto"} key={e.id}>
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
