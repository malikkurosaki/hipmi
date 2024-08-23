"use client";

import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD
} from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
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
  Stack,
  Text,
  Title
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
import { MODEL_INVESTASI } from "../_lib/interface";
import { gs_TransferValue } from "../g_state";

export default function DetailInvestasi({
  dataInvestasi,
  dataUser,
  loginUserId,
  progress,
  totalInvestor,
}: {
  dataInvestasi: MODEL_INVESTASI;
  dataUser: MODEL_PROFILE_OLD;
  loginUserId: string;
  progress: number;
  totalInvestor: number;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataInvestasi);
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
      route: RouterInvestasi_OLD.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} color="white" />,
      route: RouterInvestasi_OLD.detail_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} color="white" />,
      route: RouterInvestasi_OLD.berita,
    },
  ];

  async function onSubmit() {
    //NEW
    router.push(NEW_RouterInvestasi.pembelian + data.id, { scroll: false });

    // OLD
    // router.push(RouterInvestasi_OLD.proses_transaksi + `${data.id}`);

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

          {data.MasterProgresInvestasi.id === "1" ? (
            <Box>
              <Group position="right" spacing={"xs"}>
                <Text>
                  Sisa waktu:{" "}
                  <Text span inherit>
                    {Number(data.MasterPencarianInvestor.name) -
                      moment(new Date()).diff(
                        new Date(data.countDown),
                        "days"
                      )}{" "}
                    Hari
                  </Text>
                </Text>
              </Group>
            </Box>
          ) : (
            <Box>
              {data.MasterProgresInvestasi.id === "2" ? (
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
            src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
            radius={"sm"}
            height={250}
            width={"100%"}
          />
        </AspectRatio>

        {/* Title dan Progress */}
        <Box mb={"md"}>
          <Title order={3} mb={"xs"} align="center">
            {data.title}
          </Title>
          <Progress
            label={
              "" +
              (
                ((+data.totalLembar - +data.sisaLembar) / +data.totalLembar) *
                100
              ).toFixed(1) +
              "%"
            }
            value={
              +(
                ((+data.totalLembar - +data.sisaLembar) / +data.totalLembar) *
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
                  }).format(+data.targetDana)}
                </Text>
              </Box>
              <Box>
                <Text>Harga Per Lembar</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.hargaLembar)}
                </Text>
              </Box>
              <Box>
                <Text>Jadwal Pembagian</Text>
                <Text>{data.MasterPembagianDeviden.name} bulan </Text>
              </Box>
              <Box>
                <Text>Pembagian Deviden</Text>
                <Text>{data.MasterPeriodeDeviden.name}</Text>
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
                <Text>{data.roi}%</Text>
              </Box>
              <Box>
                <Text>Total Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.totalLembar)}{" "}
                  lembar
                </Text>
              </Box>
              <Box>
                <Text>Sisa Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.sisaLembar)}{" "}
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
                  onClick={() => router.push(e.route + `${data.id}`)}
                >
                  {e.icon}
                </ActionIcon>
              </Flex>
            </Paper>
          ))}
        </Group>

        <Box my={"md"}>
          {data.sisaLembar === "0" ||
          Number(data.MasterPencarianInvestor.name) -
            moment(new Date()).diff(new Date(data.countDown), "days") <=
            0 ? (
            <Center mb={"md"}>
              <Button disabled radius={50} variant="transparent">
                Investasi Telah Ditutup
              </Button>
            </Center>
          ) : (
            <Box>
              {loginUserId === data.authorId ? (
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
