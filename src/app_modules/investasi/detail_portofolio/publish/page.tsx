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
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import { MODEL_Investasi } from "../../model/model_investasi";
import { useState } from "react";
import moment from "moment";
import _ from "lodash";

export default function DetailPublishInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);

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
      route: RouterInvestasi.edit_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} />,
      route: RouterInvestasi.list_edit_berita,
    },
  ];

  return (
    <>
      {Number(investasi.MasterPencarianInvestor.name) -
        moment(new Date()).diff(new Date(investasi.countDown), "days") <=
      0 ? (
        <Group position="center" mb={"sm"}>
          <IconCircleCheck color="green" />
          <Text c={"green"}>Selesai</Text>
        </Group>
      ) : (
        <Group mb={"sm"} position="center">
          <Text>
            Sisa waktu :{" "}
            {Number(investasi.MasterPencarianInvestor.name) -
              moment(new Date()).diff(
                new Date(investasi.countDown),
                "days"
              )}{" "}
            hari
          </Text>
        </Group>
      )}

      <Paper withBorder mb={"md"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${investasi.imagesId}`}
          />
        </AspectRatio>
      </Paper>

      {/* Title dan Persentase */}
      <Box mb={"md"}>
        <Title order={4} mb={"xs"}>
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
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col
            span={"auto"}
            key={e.id}
            onClick={() => router.push(e.route + `${investasi.id}`)}
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
    </>
  );
}
