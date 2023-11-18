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
          key={e.id}
          withBorder
          mb={"lg"}
          onClick={() => router.push(`/dev/investasi/detail/${e.id}`)}
        >
          <CardSection p={"xs"}>
            <AspectRatio ratio={16 / 9}>
              {e.imagesId ? (
                <Image alt="" src={`/api/investasi/gambar/${e.imagesId}`} />
              ) : (
                <Image alt="" src={"/aset/no-img.png"} />
              )}
            </AspectRatio>
          </CardSection>

          {/* Progress dan titlr */}
          <CardSection p={"lg"}>
            <Stack>
              <Title order={4}>{e.title}</Title>
              <Progress
                label="0%"
                value={0}
                color="teal"
                size="xl"
                radius="xl"
                animate
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
                      <Text>Rp. {e.targetDana}</Text>
                    </Box>
                    <Box>
                      <Text>Harga Per Lembar</Text>
                      <Text>Rp. {e.hargaLembar}</Text>
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
                      <Text>Total Lembar</Text>
                      <Text>{e.totalLembar}</Text>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          </CardSection>
          <Divider />
          <CardSection p={"md"}>
            <Flex gap={"xl"} align={"center"} justify={"center"}>
              {/* <Box>
                {e.SahamTerbeli === null ? (
                  ""
                ) : (
                  <Badge variant="dot" color="teal">
                    Saham Anda
                  </Badge>
                )}
              </Box> */}

              {(() => {
                if (
                  Number(e.MasterPencarianInvestor.name) -
                    moment(new Date()).diff(new Date(e.createdAt), "days") <=
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
                        <Text>Sisa waktu:</Text>
                        <Text>
                          {Number(e.MasterPencarianInvestor.name) -
                            moment(new Date()).diff(
                              new Date(e.updatedAt),
                              "days"
                            )}
                        </Text>
                        <Text>Hari</Text>
                      </Group>
                    </>
                  );
                }
              })()}
            </Flex>
          </CardSection>
        </Card>
      ))}
    </>
  );
}
