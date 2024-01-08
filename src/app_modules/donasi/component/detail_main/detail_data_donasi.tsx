"use client";

import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Group,
  Progress,
  Grid,
  Divider,
  Image,
  Text,
} from "@mantine/core";
import {
  IconClover,
  IconMessageChatbot,
  IconMoneybag,
} from "@tabler/icons-react";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";

export function ComponentDonasi_DetailDataMain({
  donasi,
  countDonatur,
}: {
  donasi: MODEL_DONASI;
  countDonatur: number;
}) {
  const router = useRouter();
  return (
    <>
      <Stack>
        <Stack>
          <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
              <Image
                alt="Foto"
                src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
              />
            </Paper>
          </AspectRatio>
          <Stack spacing={0}>
            <Title order={4}>{donasi.title}</Title>
            <ComponentDonasi_TampilanHitungMundur
              durasi={donasi.DonasiMaster_Durasi.name}
              publishTime={donasi.publishTime}
            />
          </Stack>
          <Stack spacing={0}>
            <Group position="apart" align="center" h={"100%"}>
              <Stack spacing={0}>
                <Text fz={12}>Dana terkumpul</Text>
                <Title order={4} c="blue">
                  <TampilanRupiahDonasi nominal={+donasi.terkumpul} />
                </Title>
                <Group>
                  <Text fz={10}>Dari total</Text>{" "}
                  <TampilanRupiahDonasi
                    nominal={+donasi.target}
                    fontSize={10}
                  />
                </Group>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Stack>
            </Group>
          </Stack>
          <Progress value={+donasi.progres} animate />

          <Grid>
            <Grid.Col
              span={"auto"}
              onClick={() => router.push(RouterDonasi.donatur)}
            >
              <Stack align="center" spacing={"xs"}>
                <Group>
                  <IconClover color="skyblue" />
                  <Title order={6} c={"blue"}>
                    {countDonatur}
                  </Title>
                </Group>
                <Text fz={"xs"}>Donatur</Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => router.push(RouterDonasi.kabar)}
            >
              <Stack spacing={"sm"} align="center">
                <IconMessageChatbot color="skyblue" />
                <Text fz={"xs"}>Kabar Terbaru</Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => router.push(RouterDonasi.pencairan_dana)}
            >
              <Stack spacing={"sm"} align="center">
                <IconMoneybag color="skyblue" />
                <Text fz={"xs"}>Pencairan Dana</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}
