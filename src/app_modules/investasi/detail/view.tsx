"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
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
import {
  IconBookDownload,
  IconCircleCheck,
  IconFileDescription,
  IconSpeakerphone,
  IconXboxX,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_TransferValue } from "../g_state";
import { MODEL_Investasi } from "../model/model_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function DetailInvestasi({
  dataInvestasi,
  dataUser,
  loginUserId,
  progress,
  totalInvestor,
}: {
  dataInvestasi: MODEL_Investasi;
  dataUser: MODEL_PROFILE_OLD;
  loginUserId: string;
  progress: number;
  totalInvestor: number;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [user, setUser] = useState(dataUser);
  const [transaksiValue, setTransaksiValue] = useAtom(gs_TransferValue);
  const [boxId, setBoxId] = useState(0);
  const [isLoadingBox, setLoadingBox] = useState(false);
  const [isLoadingButton, setLoadingButton] = useState(false);

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} color="white" />,
      route: RouterInvestasi.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} color="white" />,
      route: RouterInvestasi.detail_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} color="white" />,
      route: RouterInvestasi.berita,
    },
  ];

  async function onSubmit() {
    router.push(RouterInvestasi.proses_transaksi + `${investasi.id}`);
    setTransaksiValue({
      ...transaksiValue,
      lembarTerbeli: "",
      namaBank: "",
      nomorRekening: "",
      totalTransfer: "",
    });
    setLoadingButton(true);
  }

  return (
    <>
      <Stack
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
        }}
      >
        {/* Foto username dan sisa waktu */}
        <Group position="apart" mb={"md"}>
          {/* <pre>{JSON.stringify(dataUser, null, 2)}</pre> */}
          <ComponentGlobal_AuthorNameOnHeader
            authorName={dataUser?.Profile?.name}
            imagesId={dataUser?.Profile?.imagesId}
            profileId={dataUser?.Profile?.id}
          />

          {investasi.MasterProgresInvestasi.id === "1" ? (
            <Box>
              <Group position="right" spacing={"xs"}>
                <Text>
                  Sisa waktu:{" "}
                  <Text span inherit>
                    {Number(investasi.MasterPencarianInvestor.name) -
                      moment(new Date()).diff(
                        new Date(investasi.countDown),
                        "days"
                      )}{" "}
                    Hari
                  </Text>
                </Text>
              </Group>
            </Box>
          ) : (
            <Box>
              {investasi.MasterProgresInvestasi.id === "2" ? (
                <Group position="right" spacing={"xs"}>
                  <IconCircleCheck color="green" />
                  <Text
                    truncate
                    variant="text"
                    c={Warna.hijau_tua}
                    sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                    ta="center"
                    fz="md"
                    fw={700}
                  >
                    Selesai
                  </Text>
                </Group>
              ) : (
                <Group position="right" spacing={"xs"}>
                  <IconXboxX color="red" />
                  <Text
                    truncate
                    variant="text"
                    c={Warna.merah}
                    sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                    ta="center"
                    fz="md"
                    fw={700}
                  >
                    Waktu Habis
                  </Text>
                </Group>
              )}
            </Box>
          )}
        </Group>

        <AspectRatio ratio={1 / 1} mx={"sm"} mah={250}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
            radius={"sm"}
            height={250}
            width={"100%"}
          />
        </AspectRatio>

        {/* Title dan Progress */}
        <Box mb={"md"}>
          <Title order={3} mb={"xs"} align="center">
            {investasi.title}
          </Title>
          <Progress
            label={
              "" +
              (
                ((+investasi.totalLembar - +investasi.sisaLembar) /
                  +investasi.totalLembar) *
                100
              ).toFixed(1) +
              "%"
            }
            value={
              +(
                ((+investasi.totalLembar - +investasi.sisaLembar) /
                  +investasi.totalLembar) *
                100
              ).toFixed(1)
            }
            color="teal"
            size="xl"
            radius="xl"
          />
        </Box>

        {/* Rincian Data */}
        <Grid p={"md"} mb={"md"}>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Dana Dibutuhkan</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.targetDana)}
                </Text>
              </Box>
              <Box>
                <Text>Harga Per Lembar</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.hargaLembar)}
                </Text>
              </Box>
              <Box>
                <Text>Jadwal Pembagian</Text>
                <Text>{investasi.MasterPembagianDeviden.name} bulan </Text>
              </Box>
              <Box>
                <Text>Pembagian Deviden</Text>
                <Text>{investasi.MasterPeriodeDeviden.name}</Text>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Investor</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(totalInvestor)}
                </Text>
              </Box>
              <Box>
                <Text>ROI</Text>
                <Text>{investasi.roi}%</Text>
              </Box>
              <Box>
                <Text>Total Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.totalLembar)}{" "}
                  lembar
                </Text>
              </Box>
              <Box>
                <Text>Sisa Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.sisaLembar)}{" "}
                  lembar
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* List Box */}
        <Group position="apart" px={"lg"}>
          {listBox.map((e, i) => (
            <Paper
              key={i}
              style={{
                padding: "15px",
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.softblue}`,
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text fz={12}>{e.name}</Text>
                <ActionIcon
                  radius={"xl"}
                  loading={isLoadingBox && e?.id === boxId ? true : false}
                  variant="transparent"
                  size={60}
                  onClick={() => router.push(e.route + `${investasi.id}`)}
                >
                  {e.icon}
                </ActionIcon>
              </Flex>
            </Paper>
          ))}
        </Group>

        <Box my={"md"}>
          {investasi.sisaLembar === "0" ||
          Number(investasi.MasterPencarianInvestor.name) -
            moment(new Date()).diff(new Date(investasi.countDown), "days") <=
            0 ? (
            <Center mb={"md"}>
              <Button disabled radius={50} variant="transparent">
                Investasi Telah Ditutup
              </Button>
            </Center>
          ) : (
            <Box>
              {loginUserId === investasi.authorId ? (
                <Center mb={"md"}>
                  <Button disabled radius={50}>
                    Investasi Ini Milik Anda
                  </Button>
                </Center>
              ) : (
                <Center mb={"md"}>
                  <Button
                    loaderPosition="center"
                    loading={isLoadingButton}
                    w={"100%"}
                    radius={50}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Beli Saham
                  </Button>
                </Center>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
}
