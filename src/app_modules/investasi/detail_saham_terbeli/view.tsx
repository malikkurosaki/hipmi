"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
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
import { MODEL_Transaksi_Investasi } from "../_lib/interface";
import { useState } from "react";
import moment from "moment";
import _ from "lodash";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";

export default function DetailSahamTerbeli({
  dataTransaksi,
  investor,
}: {
  dataTransaksi: MODEL_Transaksi_Investasi;
  investor: number;
}) {
  const router = useRouter();
  const [investasi, setINvestasi] = useState(dataTransaksi);
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

  return (
    <>
      <Stack>
        {/* Saham Terbeli */}
        <Stack
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
          }}
        >

          <Group position="apart">
            <Group w={"40%"} position="center">
              <Stack spacing={5} align="center">
                <Text fw={'bold'}>Total Pembelian</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.gross_amount)}
                </Text>
              </Stack>
            </Group>

            <Group w={"40%"} position="center">
              <Stack spacing={5} align="center">
                <Text fw={"bold"}>Lembar Dibeli</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.quantity)}{" "}
                  lembar
                </Text>
              </Stack>
            </Group>
          </Group>
        </Stack>

        <Stack
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Group position="apart" mb={"md"}>
            <ComponentGlobal_AuthorNameOnHeader
              authorName={investasi?.Investasi?.author?.username}
              imagesId={investasi?.Investasi?.author?.Profile?.imagesId}
              profileId={investasi?.Investasi?.author?.Profile?.id}
            />
            {(() => {
              if (
                Number(investasi.Investasi.MasterPencarianInvestor.name) -
                  moment(new Date()).diff(
                    new Date(investasi.createdAt),
                    "days"
                  ) <=
                0
              ) {
                return (
                  <>
                    <Group position="right">
                      <IconCircleCheck color="green" />
                      <Text c={"green"}>Selesai</Text>
                    </Group>
                  </>
                );
              } else {
                return (
                  <>
                    <Group position="right" spacing={"xs"}>
                      {(() => {
                        if (
                          Number(
                            investasi.Investasi.MasterPencarianInvestor.name
                          ) -
                            moment(new Date()).diff(
                              new Date(investasi.Investasi.countDown),
                              "days"
                            ) <=
                          0
                        ) {
                          return (
                            <>
                              <Group position="right" spacing={"xs"}>
                                <IconCircleCheck color="green" />
                                <Text
                                  truncate
                                  variant="text"
                                  c={Warna.hijau_tua}
                                  sx={{
                                    fontFamily: "Greycliff CF, sans-serif",
                                  }}
                                  ta="center"
                                  fz="md"
                                  fw={700}
                                >
                                  Waktu Habis
                                </Text>
                              </Group>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <Group position="right" spacing={"xs"}>
                                <Text>Sisa waktu:</Text>
                                <Text truncate>
                                  {Number(
                                    investasi.Investasi.MasterPencarianInvestor
                                      .name
                                  ) -
                                    moment(new Date()).diff(
                                      new Date(investasi.Investasi.countDown),
                                      "days"
                                    )}
                                </Text>
                                <Text truncate>Hari</Text>
                              </Group>
                            </>
                          );
                        }
                      })()}
                    </Group>
                  </>
                );
              }
            })()}
          </Group>

          {/* Gambar Investasi */}
          <AspectRatio ratio={1 / 1} mah={250} mx={"sm"}>
            <Image
              radius={"sm"}
              height={250}
              width={"100%"}
              alt=""
              src={
                RouterInvestasi_OLD.api_gambar + `${investasi.Investasi.imagesId}`
              }
            />
          </AspectRatio>

          {/* Title dan Persentase */}
          <Box mb={"md"}>
            <Title align="center" order={3} mb={"xs"}>
              {investasi.Investasi.title}
            </Title>
            <Progress
              label={
                "" +
                (
                  ((+investasi.Investasi.totalLembar -
                    +investasi.Investasi.sisaLembar) /
                    +investasi.Investasi.totalLembar) *
                  100
                ).toFixed(1) +
                "%"
              }
              value={
                +(
                  ((+investasi.Investasi.totalLembar -
                    +investasi.Investasi.sisaLembar) /
                    +investasi.Investasi.totalLembar) *
                  100
                ).toFixed(2)
              }
              color="teal"
              size="xl"
              radius="xl"
            />
          </Box>

          {/* Rincian Data */}
          <Grid p={"md"}>
            <Grid.Col span={6}>
              <Stack>
                {/* <Box>
              <Text>Terkumpul</Text>
              <Text>Rp. </Text>
            </Box> */}
                <Box>
                  <Text>Dana Dibutuhkan</Text>
                  <Text>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+investasi.Investasi.targetDana)}
                  </Text>
                </Box>
                <Box>
                  <Text>Harga Per Lembar</Text>
                  <Text>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+investasi.Investasi.hargaLembar)}
                  </Text>
                </Box>
                <Box>
                  <Text>Jadwal Pembagian</Text>
                  <Text>
                    {investasi.Investasi.MasterPembagianDeviden.name} bulan{" "}
                  </Text>
                </Box>
                <Box>
                  <Text>Pembagian Deviden</Text>
                  <Text>{investasi.Investasi.MasterPeriodeDeviden.name}</Text>
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
                    }).format(investor)}{" "}
                  </Text>
                </Box>
                <Box>
                  <Text>ROI</Text>
                  <Text>{investasi.Investasi.roi}%</Text>
                </Box>
                <Box>
                  <Text>Total Lembar</Text>
                  <Text>
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+investasi.Investasi.totalLembar)}{" "}
                    lembar
                  </Text>
                </Box>
                <Box>
                  <Text>Sisa Lembar</Text>
                  <Text>
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+investasi.Investasi.sisaLembar)}{" "}
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
                    variant="transparent"
                    size={60}
                    onClick={() => router.push(e.route + `${investasi.Investasi.id}`)}
                  >
                    {e.icon}
                  </ActionIcon>
                </Flex>
              </Paper>
            ))}
          </Group>

          {/* 
        <Grid mb={"sm"} justify="center">
          {listBox.map((e) => (
            <Grid.Col
              span={"auto"}
              key={e.id}
              onClick={() => router.push(e.route + `${investasi.Investasi.id}`)}
            >
              <Center>
                <Paper h={100} w={100} bg={"gray.4"} withBorder py={"xs"}>
                  <Flex
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                  >
                    <Text fz={12}>{e.name}</Text>
                    <ActionIcon variant="transparent" size={60}>
                      {e.icon}
                    </ActionIcon>
                  </Flex>
                </Paper>
              </Center>
            </Grid.Col>
          ))}
        </Grid> */}
        </Stack>
      </Stack>
    </>
  );
}
