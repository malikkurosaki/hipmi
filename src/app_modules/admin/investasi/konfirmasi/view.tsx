"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import {
  Group,
  Flex,
  Avatar,
  Paper,
  AspectRatio,
  Box,
  Title,
  Slider,
  Grid,
  Stack,
  ActionIcon,
  Center,
  Button,
  Text,
  Image,
  Collapse,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBookDownload,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function Admin_KonfirmasiInvestasi({ id }: { id: string }) {
  const router = useRouter();
  const [publish, setPublish] = useState(true);
  const [opened, { toggle }] = useDisclosure(false);

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
      <Group position="left" mb={"md"}>
        <Flex align={"center"} gap={"xs"}>
          <Avatar src={"/aset/avatar.png"} />
          <Text>Username</Text>
        </Flex>
        {/* <Text>Sisa waktu : 20 Hari</Text> */}
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
      <Grid mb={"xl"}>
        {listBox.map((e) => (
          <Grid.Col
            span={"auto"}
            key={e.id}
            onClick={() => router.push(e.route + `${id}`)}
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

      <Stack mb={40}>
        {/* Button publish dan reject */}
        <Grid>
          {/* Publish */}
          <Grid.Col span={6}>
            <Center>
              {publish ? (
                <Button
                  radius={50}
                  w={200}
                  bg={"green"}
                  color="green"
                  onClick={() => {
                    setTimeout(() => setPublish(false), 1000);
                    toast("Proyek Investasi Di Publish");
                  }}
                >
                  Publish
                </Button>
              ) : (
                <Button
                  radius={50}
                  w={200}
                  bg={"orange"}
                  color="orange"
                  onClick={() => {
                    setTimeout(() => setPublish(true), 1000);
                    toast("Proyek Investasi Di Non-Aktifkan");
                  }}
                >
                  Non - aktif
                </Button>
              )}
            </Center>
          </Grid.Col>
          {/* Reject */}
          <Grid.Col span={6}>
            <Center>
              <Button
                w={200}
                radius={50}
                bg={"red"}
                color="red"
                onClick={toggle}
                rightIcon={!opened ? <IconChevronLeft /> : <IconChevronDown />}
              >
                Reject
              </Button>
            </Center>
          </Grid.Col>
        </Grid>

        {/* Text area reject */}
        <Collapse in={opened}>
          <Paper bg={"gray.4"} p={"xs"}>
            <Stack>
              <Textarea
                withAsterisk
                label="Alasan:"
                placeholder="Masukan alasan penolakan"
                autosize
                minRows={2}
                maxRows={4}
              />
              <Group position="right">
                <Button
                  w={100}
                  radius={50}
                  bg={Warna.biru}
                  compact
                  onClick={toggle}
                >
                  Kirim
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Collapse>
      </Stack>
    </>
  );
}
