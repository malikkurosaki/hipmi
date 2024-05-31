"use client";

import { ApiHipmi } from "@/app/lib/api";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
import {
  ActionIcon,
  Affix,
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
  rem,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import dataDummy from "../dummy/data_dummy.json";
import moment from "moment";
import {
  IconCheck,
  IconCircleCheck,
  IconPencilPlus,
  IconXboxX,
} from "@tabler/icons-react";
import { MODEL_Investasi } from "../model/model_investasi";
import _ from "lodash";
import { useState } from "react";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export default function MainInvestasi({
  listData,
  dataSelesai,
  dataWaktuHabis,
}: {
  listData: MODEL_Investasi[];
  dataSelesai: MODEL_Investasi[];
  dataWaktuHabis: MODEL_Investasi[];
}) {
  // console.log(listData)
  const router = useRouter();
  const [investasi, setInvestasi] = useState(listData);
  const [invesDone, setInvesDone] = useState(dataSelesai);
  const [invesFail, setInvesFail] = useState(dataWaktuHabis);
  const [statusPublish, setStatusPublish] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDetail, setLoadingDetail] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();

  //  console.log(dataWaktuHabis)

  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
        <ActionIcon
          loading={isLoading ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoading(true);
            router.push(RouterInvestasi.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      {_.isEmpty(investasi) && _.isEmpty(invesDone) && _.isEmpty(invesFail) ? (
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      ) : (
        investasi.map((e) => (
          <Card
            // sx={{ borderStyle: "solid", borderColor: "black", borderWidth: "0.5px" }}
            radius={"sm"}
            key={e.id}
            mb={"lg"}
            withBorder
            p={"xl"}
            shadow="lg"
          >
            <CardSection>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"sm"} withBorder>
                  {e.imagesId ? (
                    <Image
                      alt=""
                      src={RouterInvestasi.api_gambar + `${e.imagesId}`}
                    />
                  ) : (
                    <Image alt="" src={"/aset/no-img.png"} />
                  )}
                </Paper>
              </AspectRatio>
            </CardSection>

            <CardSection p={"sm"}>
              <Stack>
                <Title order={4}>{e.title}</Title>
                <Progress
                  label={(+e.progress).toFixed(2) + " %"}
                  value={+e.progress}
                  color="teal"
                  size="xl"
                  radius="xl"
                />
              </Stack>
            </CardSection>
            <CardSection p={"sm"}>
              <Box>
                <Grid>
                  <Grid.Col span={6}>
                    <Center>
                      <Stack>
                        <Box>
                          <Text truncate>Dana Dibutuhkan</Text>
                          <Text truncate>
                            Rp.{" "}
                            {new Intl.NumberFormat("id-ID", {
                              maximumSignificantDigits: 10,
                            }).format(+e.targetDana)}
                          </Text>
                        </Box>
                        <Box>
                          <Text truncate>Harga Per Lembar</Text>
                          <Text truncate>
                            Rp.{" "}
                            {new Intl.NumberFormat("id-ID", {
                              maximumSignificantDigits: 10,
                            }).format(+e.hargaLembar)}
                          </Text>
                        </Box>
                      </Stack>
                    </Center>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Center>
                      <Stack>
                        <Box>
                          <Text truncate>ROI</Text>
                          <Text truncate>{e.roi}%</Text>
                        </Box>
                        <Box>
                          <Text truncate>Sisa Lembar</Text>
                          <Text truncate>
                            {new Intl.NumberFormat("id-ID").format(
                              +e.sisaLembar
                            )}
                          </Text>
                        </Box>
                      </Stack>
                    </Center>
                  </Grid.Col>
                </Grid>
              </Box>
            </CardSection>
            <Divider color="gray.4" />
            <CardSection p={"md"}>
              <Group position="apart">
                <Button
                  loaderPosition="center"
                  loading={isLoadingDetail ? true : false}
                  radius={"xl"}
                  compact
                  bg={Warna.hijau_muda}
                  color="green"
                  onClick={() => {
                    setLoadingDetail(true);
                    router.push(RouterInvestasi.detail + `${e.id}`);
                  }}
                >
                  Detail
                </Button>

                {e.progress === "100" ? (
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
                  <Box>
                    {+e.MasterPencarianInvestor.name -
                      moment(new Date()).diff(new Date(e.countDown), "days") <=
                    0 ? (
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
                    ) : (
                      <Group position="right" spacing={"xs"}>
                        <Text truncate>Sisa waktu:</Text>
                        <Text truncate>
                          {Number(e.MasterPencarianInvestor.name) -
                            moment(new Date()).diff(
                              new Date(e.countDown),
                              "days"
                            )}
                        </Text>
                        <Text truncate>Hari</Text>
                      </Group>
                    )}
                  </Box>
                )}
              </Group>
            </CardSection>
          </Card>
        ))
      )}
    </>
  );
}
