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
  SimpleGrid,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import dataDummy from "../dummy/data_dummy.json";
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";
import { useState } from "react";
import { Warna } from "@/app/lib/warna";
import _ from "lodash";

export default function InvestasiSahamTerbeli({
  listTransaksi,
}: {
  listTransaksi: MODEL_Transaksi_Investasi[];
}) {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState(listTransaksi);

  if (_.isEmpty(transaksi)) {
    return (
      <>
        <Center h={"80vh"}>
          <Text>Saham Anda Kosong</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {transaksi.map((e) => (
          <Card key={e.id} bg={"gray.5"} radius={"md"}>
            <Card.Section withBorder p={"sm"}>
              <Group position="apart">
                <Group>
                  <Avatar radius={"xl"}>
                    {(() => {
                      const usr = e.Investasi.author.username;
                      const splt = usr.split("");
                      const Up = _.upperCase(splt[0]);

                      return Up;
                    })()}
                  </Avatar>
                  <Text>{e.Investasi.author.username}</Text>
                </Group>

                <Button
                  bg={"teal"}
                  radius={"xl"}
                  compact
                  onClick={() =>
                    router.push(
                      RouterInvestasi.detail_saham_terbeli + `${e.id}`
                    )
                  }
                >
                  Detail
                </Button>
              </Group>
            </Card.Section>

            <Card.Section p={"md"}>
              <Stack spacing={"lg"}>
                <Stack spacing={"lg"}>
                  <Center>
                    <Text fw={"bold"} fz={20} truncate>
                      {e.Investasi.title}
                    </Text>
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
                      ).toFixed(1)
                    }
                    color="teal"
                    size="xl"
                    radius="xl"
                  />
                </Stack>
                <Grid>
                  <Grid.Col span={6}>
                    <Stack spacing={5}>
                      <Stack spacing={0}>
                        <Text fz={14}>Lembar Saham:</Text>
                        <Text fw={"bold"} truncate>
                          {new Intl.NumberFormat("id-ID", {
                            maximumFractionDigits: 10,
                          }).format(+e.quantity)}
                        </Text>
                      </Stack>
                      <Stack spacing={0}>
                        <Text fz={14}>Total:</Text>
                        <Text fw={"bold"} truncate>
                          Rp.{" "}
                          {new Intl.NumberFormat("id-ID", {
                            maximumFractionDigits: 10,
                          }).format(+e.gross_amount)}
                        </Text>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <AspectRatio ratio={16 / 9}>
                      <Paper radius={"md"}>
                        {e.Investasi.imagesId ? (
                          <Image
                            alt=""
                            src={
                              RouterInvestasi.api_gambar +
                              `${e.Investasi.imagesId}`
                            }
                          />
                        ) : (
                          <Image alt="" src={"/aset/no-img.png"} />
                        )}
                      </Paper>
                    </AspectRatio>
                  </Grid.Col>
                </Grid>
              </Stack>
              <Box></Box>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
