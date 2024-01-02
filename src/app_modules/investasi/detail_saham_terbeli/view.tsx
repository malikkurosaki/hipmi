"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
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
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";
import { useState } from "react";
import moment from "moment";
import _ from "lodash";

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
      <Group position="apart" mb={"md"}>
        <Flex align={"center"} gap={"xs"}>
          <Avatar radius={"xl"} bg={"gray"}>
            {(() => {
              const usr = investasi.Investasi.author.username;
              const splt = usr.split("");
              const Up = _.upperCase(splt[0]);

              return Up;
            })()}
          </Avatar>
          <Text>{investasi.Investasi.author.username}</Text>
        </Flex>
        {(() => {
          if (
            Number(investasi.Investasi.MasterPencarianInvestor.name) -
              moment(new Date()).diff(new Date(investasi.createdAt), "days") <=
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
                      Number(investasi.Investasi.MasterPencarianInvestor.name) -
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
                              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
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
                                investasi.Investasi.MasterPencarianInvestor.name
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
      <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.Investasi.imagesId}`}
          />
        </AspectRatio>
      </Paper>

      {/* Title dan Persentase */}
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
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
              <Text>{new Intl.NumberFormat("id-ID", {maximumSignificantDigits: 10}).format(investor)} </Text>
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
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.gross_amount)}
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Lembar Dibeli</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+investasi.quantity)}{" "}
                  lembar
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      {/* List Box */}
      <Grid mb={"sm"} justify="center">
        {listBox.map((e) => (
          <Grid.Col
            span={"auto"}
            key={e.id}
            onClick={() => router.push(e.route + `${investasi.Investasi.id}`)}
          >
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
