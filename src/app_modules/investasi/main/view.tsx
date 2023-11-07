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
  Divider,
  Grid,
  Group,
  Image,
  Paper,
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

export default function MainInvestasi({
  listData,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  listData: MODEL_Investasi[]
  pencarianInvestor: MODEL_DEFAULT_MASTER[];
  periodeDeviden: MODEL_DEFAULT_MASTER[];
  pembagianDeviden: MODEL_DEFAULT_MASTER[];
}) {
  const router = useRouter();

  return (
    <>
      {/* <pre>{JSON.stringify(listData, null, 2)}</pre> */}
      {dataDummy.map((e) => (
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

          <CardSection p={"lg"}>
            <Box mb={"md"}>
              <Title order={4}>{e.title}</Title>
              <Slider
                size={10}
                disabled
                labelAlwaysOn
                value={e.persentase}
                marks={[{ value: e.persentase, label: e.persentase + `%` }]}
              />
            </Box>
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
            <Group position="apart" px={"sm"}>
              <Box>
                {e.saham_beli === 0 ? (
                  ""
                ) : (
                  <Badge variant="dot" color="teal">
                    Saham Anda
                  </Badge>
                )}
              </Box>
              {(() => {
                if (
                  e.masterPencarianInvestorId -
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
                          {e.masterPencarianInvestorId -
                            moment(new Date()).diff(
                              new Date(e.createdAt),
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
