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
  Center,
  Loader,
} from "@mantine/core";
import {
  IconClover,
  IconMessageChatbot,
  IconMoneybag,
} from "@tabler/icons-react";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NotifPeringatan } from "../notifikasi/notif_peringatan";
import { NotifBerhasil } from "../notifikasi/notif_berhasil";
import { Donasi_findDonaturByTokenId } from "../../fun/get/get_donatur_by_token_id";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/component_global/loading_card";

export function ComponentDonasi_DetailDataMain({
  donasi,
  countDonatur,
  userLoginId,
}: {
  donasi: MODEL_DONASI;
  countDonatur: number;
  userLoginId?: string | any;
}) {
  const router = useRouter();
  const [isLoadingDonatur, setLoadingDonatur] = useState(false);
  const [isLoadingKabar, setLoadingKabar] = useState(false);
  const [isLoadingPencairan, setLoadingPencairan] = useState(false);

  return (
    <>
      <Stack px={"xs"}>
        <Stack>
          <Center>
            <Image
              mah={500}
              maw={"auto"}
              radius={"md"}
              alt="Foto"
              src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
            />
          </Center>
          {/* <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"}>
            </Paper>
          </AspectRatio> */}
          <Stack spacing={0} mt={"lg"}>
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
              onClick={() => {
                setLoadingDonatur(true);
                router.push(RouterDonasi.donatur + `${donasi.id}`);
              }}
            >
              <Stack align="center" spacing={"xs"}>
                <Group>
                  {isLoadingDonatur ? (
                    <Loader size={25} />
                  ) : (
                    <IconClover color="skyblue" />
                  )}

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
              onClick={() => {
                setLoadingKabar(true);
                router.push(RouterDonasi.kabar + `${donasi.id}`);
              }}
            >
              <Stack spacing={"sm"} align="center">
                {isLoadingKabar ? (
                  <Loader size={25} />
                ) : (
                  <IconMessageChatbot color="skyblue" />
                )}
                <Text fz={"xs"}>Kabar Terbaru</Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => {
                setLoadingPencairan(true);
                onPencairanDana(router, donasi, userLoginId);
              }}
            >
              <Stack spacing={"sm"} align="center">
                {isLoadingPencairan ? (
                  <Loader size={25} />
                ) : (
                  <IconMoneybag color="skyblue" />
                )}
                <Text fz={"xs"}>Pencairan Dana</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}

async function onPencairanDana(
  router: AppRouterInstance,
  donasi: MODEL_DONASI,
  userLoginId: string
) {
  // console.log(userLoginId)
  // console.log(donasi.authorId)
  const cek = await Donasi_findDonaturByTokenId(donasi.id, userLoginId);

  if (userLoginId == donasi.authorId)
    return router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);

  if (!cek) return NotifPeringatan("Halaman khusus donatur");
  router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);

  // if (userLoginId != donasi.authorId)
  //   return NotifPeringatan("Halaman khusus donatur");
  // router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);
}
