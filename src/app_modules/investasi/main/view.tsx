"use client";

import { ApiHipmi } from "@/app/lib/api";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/models/model_default_master";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
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
import { useRouter } from "next/navigation";
import dataDummy from "../dummy/data_dummy.json";
import moment from "moment";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { MODEL_Investasi } from "../model/model_investasi";
import _ from "lodash";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";

export default function MainInvestasi({
  listData,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  listData: MODEL_Investasi[];
  pencarianInvestor: MODEL_DEFAULT_MASTER[];
  periodeDeviden: MODEL_DEFAULT_MASTER[];
  pembagianDeviden: MODEL_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(listData);
  const [progres, setProgres] = useState(0);

  async function onProgres(data: MODEL_Investasi) {
    // console.log(data)
    const total = Number(data.totalLembar);
    const sisa = Number(data.sisaLembar);
    const beli = total - sisa;
    const hasil = (beli / total) * 100;
    const progres = Math.round(hasil).toFixed(2);
    // console.log(progres)
    return progres;
  }

  if (_.isEmpty(investasi))
    return (
      <>
        {" "}
        <Center h={"80vh"}>
          <Text>BURSA KOSONG</Text>
        </Center>
      </>
    );

  return (
    <>
      {/* <pre>{JSON.stringify(listData, null, 2)}</pre> */}

      {investasi.map((e) => (
        <Card
          // sx={{ borderStyle: "solid", borderColor: "black", borderWidth: "0.5px" }}
          radius={"md"}
          key={e.id}
          mb={"lg"}
          bg={"dark.1"}
        >
          <CardSection p={"md"}>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                {e.imagesId ? (
                  <Image alt="" src={`/api/investasi/gambar/${e.imagesId}`} />
                ) : (
                  <Image alt="" src={"/aset/no-img.png"} />
                )}
              </Paper>
            </AspectRatio>
          </CardSection>

          {/* Progress dan titlr */}
          <CardSection p={"lg"}>
            <Stack>
              <Title order={4}>{e.title}</Title>
              <Progress
                label={
                  "" +
                  (
                    ((+e.totalLembar - +e.sisaLembar) / +e.totalLembar) *
                    100
                  ).toFixed(1) +
                  "%"
                }
                value={
                  +(
                    ((+e.totalLembar - +e.sisaLembar) / +e.totalLembar) *
                    100
                  ).toFixed(2)
                }
                color="teal"
                size="xl"
                radius="xl"
              />
            </Stack>
          </CardSection>
          <CardSection p={"md"}>
            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>Dana Dibutuhkan</Text>
                      <Text>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumSignificantDigits: 10,
                        }).format(+e.targetDana)}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Harga Per Lembar</Text>
                      <Text>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumSignificantDigits: 10,
                        }).format(+e.hargaLembar)}
                        {/* {e.hargaLembar} */}
                      </Text>
                    </Box>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>ROI</Text>
                      <Text>{e.roi}%</Text>
                    </Box>
                    <Box>
                      <Text>Sisa Lembar</Text>
                      <Text>
                        {new Intl.NumberFormat("id-ID").format(+e.sisaLembar)}
                      </Text>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          </CardSection>
          <Divider color="dark.4" />
          <CardSection p={"md"}>
            <Group position="apart">
              {/* <Box>
                {e.SahamTerbeli === null ? (
                  ""
                ) : (
                  <Badge variant="dot" color="teal">
                    Saham Anda
                  </Badge>
                )}
              </Box> */}
              <Button
                radius={"xl"}
                compact
                bg={Warna.hijau_muda}
                color="green"
                onClick={() => router.push(RouterInvestasi.detail + `${e.id}`)}
              >
                Details
              </Button>

              {(() => {
                if (
                  Number(e.MasterPencarianInvestor.name) -
                    moment(new Date()).diff(new Date(e.countDown), "days") <=
                  0
                ) {
                  return (
                    <>
                      <Group position="right" spacing={"xs"}>
                        <IconCircleCheck color="green" />
                        <Text
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
                        <Text>
                          {Number(e.MasterPencarianInvestor.name) -
                            moment(new Date()).diff(
                              new Date(e.countDown),
                              "days"
                            )}
                        </Text>
                        <Text>Hari</Text>
                      </Group>
                    </>
                  );
                }
              })()}
            </Group>
          </CardSection>
        </Card>
      ))}
    </>
  );
}
