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
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";

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
      <Stack
        style={{
          padding: "15px",
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Stack>
          <AspectRatio ratio={1 / 1} mx={"sm"} mah={300}>
            <Image
              alt="Foto"
              src={RouterDonasi.api_image + `${donasi?.imageDonasi?.url}`}
              radius={"sm"}
            />
          </AspectRatio>

          <Stack spacing={0} mt={"lg"}>
            <Title order={4}>{donasi?.title}</Title>
            <ComponentDonasi_TampilanHitungMundur
              durasi={donasi?.DonasiMaster_Durasi.name}
              publishTime={donasi?.publishTime}
            />
          </Stack>
          <Stack spacing={0}>
            <Group position="apart" align="center" h={"100%"}>
              <Stack spacing={0}>
                <Text fz={12}>Dana terkumpul</Text>
                <Title order={4} c="blue">
                  <TampilanRupiahDonasi nominal={+donasi?.terkumpul} />
                </Title>
                <Group>
                  <Text fz={10}>Dari total</Text>{" "}
                  <TampilanRupiahDonasi
                    nominal={+donasi?.target}
                    fontSize={10}
                  />
                </Group>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title
                  order={4}
                  style={{
                    color: MainColor.yellow,
                  }}
                >
                  {donasi?.DonasiMaster_Ketegori.name}
                </Title>
              </Stack>
            </Group>
          </Stack>
          <Progress value={+donasi?.progres} color="yellow" size={"lg"} />

          <Grid>
            <Grid.Col
              span={"auto"}
              onClick={() => {
                setLoadingDonatur(true);
                router.push(RouterDonasi.donatur + `${donasi.id}`);
              }}
            >
              <Stack
                align="center"
                spacing={"xs"}
                style={{
                  color: MainColor.yellow,
                }}
              >
                <Group align="center" h={"100%"}>
                  {isLoadingDonatur ? (
                    <ComponentGlobal_Loader size={25} />
                  ) : (
                    <IconClover />
                  )}

                  <Title order={6}>{countDonatur}</Title>
                </Group>
                <Text fz={"xs"} c={"white"}>
                  Donatur
                </Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => {
                setLoadingKabar(true);
                router.push(RouterDonasi.kabar + `${donasi?.id}`);
              }}
            >
              <Stack spacing={"sm"} align="center">
                {isLoadingKabar ? (
                  <ComponentGlobal_Loader size={25} />
                ) : (
                  <IconMessageChatbot
                    style={{
                      color: MainColor.yellow,
                    }}
                  />
                )}
                <Text fz={"xs"}>Kabar Terbaru</Text>
              </Stack>
            </Grid.Col>
            <Divider orientation="vertical" />
            <Grid.Col
              span={"auto"}
              onClick={() => {
                onPencairanDana(
                  router,
                  donasi,
                  userLoginId,
                  setLoadingPencairan
                );
              }}
            >
              <Stack spacing={"sm"} align="center">
                {isLoadingPencairan ? (
                  <ComponentGlobal_Loader size={25} />
                ) : (
                  <IconMoneybag
                    style={{
                      color: MainColor.yellow,
                    }}
                  />
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
  userLoginId: string,
  setLoadingPencairan: any
) {
  const cek = await Donasi_findDonaturByTokenId(donasi.id, userLoginId);
  if (userLoginId == donasi.authorId) {
    setLoadingPencairan(true);
    return router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);
  }

  if (!cek) {
    return NotifPeringatan("Halaman khusus donatur");
  } else {
    setLoadingPencairan(true);
    router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);
  }
}
