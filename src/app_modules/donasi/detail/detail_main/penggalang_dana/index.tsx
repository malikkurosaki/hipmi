"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconBrandGmail,
  IconHome,
  IconMoodSmile,
  IconPhone,
  IconRecordMail,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import router from "next/router";

export default function PenggalangDanaDonasi() {
  return (
    <>
      <Stack>
        <InformasiPenggalang />
        <DataPengganganDana />
      </Stack>
    </>
  );
}

function InformasiPenggalang() {
  return (
    <>
      <Paper radius={"md"}>
        <Stack bg={"gray.1"} p={"md"} spacing={"xl"} sx={{borderRadius: "10px"}}>
          <Stack align="center" spacing={0}>
            <Paper
              radius={"100%"}
              h={100}
              w={100}
              sx={{ borderStyle: "solid" }}
            >
              <Center h={"100%"}>
                <Image
                  width={100}
                  height={100}
                  alt="Foto"
                  src={"/aset/avatar.png"}
                />
              </Center>
            </Paper>
            <Title order={3}>@Username</Title>
          </Stack>
          <Stack>
            <Group>
              <IconMoodSmile />
              <Text>Nama Penggalang Dana</Text>
            </Group>
            <Group>
              <IconPhone />
              <Text>+62 81x xxx xxx</Text>
            </Group>
            <Group>
              <IconBrandGmail />
              <Text>user1@gmail.com</Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

function DataPengganganDana() {
  const router = useRouter();
  const { height, width } = useViewportSize();
  return (
    <>
      <Title order={5}>Peggalangan Dana Yang Dilakukan</Title>

      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Box key={i} onClick={() => router.push(RouterDonasi.detail_main)}>
              <Stack>
                <Grid>
                  <Grid.Col span={7}>
                    <AspectRatio ratio={16 / 9}>
                      <Paper radius={"md"}>
                        <Image
                          alt="Foto"
                          src={"/aset/no-img.png"}
                          radius={"md"}
                        />
                      </Paper>
                    </AspectRatio>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Stack spacing={"xs"}>
                      <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                        Judul Donasi Bisa Dilihat Disini Untuk Contoh
                      </Text>
                      <Progress value={50} color="orange" />
                      <Stack spacing={0}>
                        <Text fz={"sm"}>Terkumpul</Text>
                        <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                          Rp. 100.000.000
                        </Text>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                </Grid>
                {width > 575 ? "" : <Divider />}
              </Stack>
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
}
