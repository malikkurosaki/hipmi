"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Title,
  Card,
  CardSection,
  Group,
  Flex,
  Avatar,
  AspectRatio,
  Box,
  Slider,
  Grid,
  Stack,
  Divider,
  Badge,
  Image,
  Text,
  Button,
  Paper,
  Progress,
  Center,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import dataDummy from "../dummy/data_dummy.json";
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";
import { useState } from "react";
import { Warna } from "@/app/lib/warna";

export default function InvestasiSahamTerbeli({
  listTransaksi,
}: {
  listTransaksi: MODEL_Transaksi_Investasi[];
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(listTransaksi);

  return (
    <>
      {/* {investasi.map((e) => (
        <Card
          // sx={{ borderStyle: "solid", borderColor: "black", borderWidth: "0.5px" }}
          radius={"md"}
          key={e.id}
          mb={"lg"}
          bg={"green.3"}
        >
          <CardSection p={"md"}>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                {e.Investasi.imagesId ? (
                  <Image
                    alt=""
                    src={`/api/investasi/gambar/${e.Investasi.imagesId}`}
                  />
                ) : (
                  <Image alt="" src={"/aset/no-img.png"} />
                )}
              </Paper>
            </AspectRatio>
          </CardSection>


          <CardSection p={"lg"}>
            <Stack>
              <Center>
                <Title order={4}>{e.Investasi.title}</Title>
              </Center>
              <Progress
                label={
                  "" +
                  (
                    ((+e.Investasi.totalLembar - +e.Investasi.sisaLembar) /
                      +e.Investasi.totalLembar) *
                    100
                  ).toFixed(1) +
                  "%"
                }
                value={
                  +(
                    ((+e.Investasi.totalLembar - +e.Investasi.sisaLembar) /
                      +e.Investasi.totalLembar) *
                    100
                  ).toFixed(2)
                }
                color="teal"
                size="xl"
                radius="xl"
              />
            </Stack>
          </CardSection>

          <Stack>
            <CardSection px={"md"}>
              <Group>
                <Text>Saham Terbeli :</Text>
                <Text fz={"xl"} >{new Intl.NumberFormat("id-ID", {maximumFractionDigits: 10}).format(+ e.quantity)} Lembar</Text>
              </Group>
              <Group>
                <Text> Total Pembelian :</Text>
                <Text fz={"xl"} >Rp. {new Intl.NumberFormat("id-ID", {maximumFractionDigits: 10}).format(+ e.gross_amount)}</Text>
              </Group>
            </CardSection>

            <CardSection py={"sm"}>
              <Group position="center">
                <Button
                  radius={"xl"}
                  compact
                  bg={Warna.hijau_muda}
                  color="green"
                  onClick={() =>
                    router.push(
                      RouterInvestasi.detail_saham_terbeli + `${e.id}`
                    )
                  }
                >
                  Details
                </Button>
              </Group>
            </CardSection>
          </Stack>
        </Card>
      ))} */}

      <Paper bg={"gray.4"} p={"md"}>
        <Group position="apart">
          <Group>
            <Avatar radius={"xl"} />
            <Text>Username</Text>
          </Group>
          <Button bg={"green.5"} radius={"xl"}>
            Detail
          </Button>
        </Group>
        <Divider color="black.3" my={"md"} />
        <Stack>
          <Center>
            <Title order={4}>Judul Investasi</Title>
          </Center>
          <Progress size={"xl"} value={40} label="40 %" radius={"xl"} />
          <Image alt="" src={"/aset/no-img.png"} radius={"md"}/>
        </Stack>

       
      </Paper>
    </>
  );
}
