"use client";

import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  CopyButton,
  Divider,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import { IconAlertTriangle } from "@tabler/icons-react";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";

import { useState } from "react";
import Countdown from "react-countdown";
import {
  MODEL_Investasi,
  MODEL_Transaksi_Investasi,
} from "../model/model_investasi";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { useAtom } from "jotai";
import { gs_TransferValue, gs_investas_menu } from "../g_state";
import funGantiStatusTransaksi_Investasi from "../fun/fun_ganti_status_transaksi";

export default function TransferInvestasi({
  dataTransaksi,
}: {
  dataTransaksi: MODEL_Transaksi_Investasi;
}) {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState(dataTransaksi);
  const [countDown, setCountDown] = useState<number | any>({
    jam: null,
    menit: null,
    detik: null,
  });

  // useShallowEffect(() => {
  //   const inter = apa_kabar("2023-11-18");
  //   return () => clearInterval(inter);
  // }, []);
  // function apa_kabar(date: string) {
  //   let d = moment.duration(moment(date).diff(new Date()));
  //   const inter = setInterval(() => {
  //     d = moment.duration(+d - 1000, "milliseconds");

  //     console.log(d.days(), "=", d.hours(), ":", d.minutes(), ":", d.seconds());
  //   }, 1000);
  //   return inter;
  // }

  // useShallowEffect(() => {
  //   const mulai = moment(transaksi.createdAt).format();
  //   const selesai = moment(transaksi.createdAt).add(1, "days").format();
  //   const timer = funCountDown(mulai as any, selesai as any);

  //   return () => clearInterval(timer);
  // }, []);

  // functionbaru ==========================//
  const selesai = moment(transaksi.createdAt).add(1, "days").format();
  let durasi = moment.duration(moment(selesai).diff(new Date()));
  const interval = useInterval(() => {
    durasi = moment.duration(+durasi - 1000, "milliseconds");
    if (durasi.hours() <= 0 && durasi.minutes() <= 0 && durasi.seconds() <= 0) {
      funGantiStatusTransaksi_Investasi(transaksi.id, "4").then((res) => {
        if (res.status === 200) {
          router.push(
            RouterInvestasi.status_transaksi_gagal + `${transaksi.id}`
          );
          interval.stop();
        }
      });
    }
    setCountDown({
      ...countDown,
      jam: durasi.hours(),
      menit: durasi.minutes(),
      detik: durasi.seconds(),
    });
  }, 1000);

  useShallowEffect(() => {
    interval.start();
  }, []);

  return (
    <>
      {/* <pre>{JSON.stringify(transaksi, null,2)}</pre> */}
      {/* {countDown.jam} */}
      <Stack spacing={"lg"}>
        <Stack spacing={0} mb={"xs"}>
          <Text fz={12}>Mohon transfer untuk diteruskan ke :</Text>
          <Group align="center">
            <Title order={5}>{transaksi.Investasi.title}</Title>
          </Group>
          <Divider my={"md"} />
          <Grid>
            <Grid.Col span={4}>
              <Text fz={"xs"}>Transfer sebelum</Text>
            </Grid.Col>
            <Grid.Col span={5}>
              <Text fz={"xs"} fw={"bold"}>
                {moment(transaksi.createdAt).format("lll")}
              </Text>
            </Grid.Col>
            <Grid.Col span={3} fz={"xs"}>
              <Paper bg={"red"} px={"xs"}>
                <Center>
                  {countDown.jam <= 0 &&
                  countDown.menit <= 0 &&
                  countDown.detik <= 0 ? (
                    <Flex align={"center"} justify={"center"}>
                      <Text fz={9}>Waktu Habis</Text>
                    </Flex>
                  ) : (
                    <Box>
                      {countDown.jam}:{countDown.menit}:{countDown.detik}
                    </Box>
                  )}
                </Center>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>

        <Stack spacing={"xl"}>
          {/* Nama Rekening */}
          <Stack spacing={5}>
            <Group>
              <Avatar size={"md"} variant="filled" />
              <Stack spacing={0}>
                <Text>Bank {transaksi.namaBank}</Text>
                <Text>PT. Xendit Jakarta</Text>
              </Stack>
            </Group>
            <Paper
              bg={"gray.3"}
              sx={{ alignContent: "center" }}
              p={"sm"}
              radius={10}
            >
              <Grid align="center">
                <Grid.Col span={8}>
                  <Text fw={"bold"}>{transaksi.nomorRekening}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Center>
                    <CopyButton value={transaksi.nomorRekening}>
                      {({ copied, copy }) => (
                        <Button
                          variant="filled"
                          radius={50}
                          compact
                          bg={copied ? "teal" : "gray"}
                          color="gray"
                          onClick={copy}
                        >
                          {copied ? "Tersalin" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Center>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>

          {/* Nomor rekening */}
          <Stack spacing={5}>
            <Text>Total Transfer</Text>
            <Paper
              bg={"gray.3"}
              sx={{ alignContent: "center" }}
              p={"sm"}
              radius={10}
            >
              <Grid align="center">
                <Grid.Col span={8}>
                  {/* <Text fw={"bold"}>Rp. {transaksi.totalTransfer}</Text> */}
                </Grid.Col>
                <Grid.Col span={4}>
                  <Center>
                    {/* <CopyButton value={transaksi.totalTransfer}>
                      {({ copied, copy }) => (
                        <Button
                          variant="filled"
                          radius={50}
                          compact
                          bg={copied ? "teal" : "gray"}
                          color="gray"
                          onClick={copy}
                        >
                          {copied ? "Tersalin" : "Salin"}
                        </Button>
                      )}
                    </CopyButton> */}
                  </Center>
                </Grid.Col>
              </Grid>
            </Paper>
            <Group spacing={5}>
              <IconAlertTriangle color="orange" size={10} />
              <Text fz={"sm"}>Pastikan jumlahnya benar</Text>
            </Group>
          </Stack>
        </Stack>
      </Stack>

      {/* Tombol Sudah Transfer */}
      <Center mt={100}>
        <Button
          radius={50}
          w={300}
          bg={Warna.biru}
          onClick={() => {
            router.push(RouterInvestasi.dialog_transaksi);
            // setHotMenu(1);
            // router.push(RouterInvestasi.status_transaksi);
          }}
        >
          Sudah Transfer
        </Button>
      </Center>
    </>
  );
}
