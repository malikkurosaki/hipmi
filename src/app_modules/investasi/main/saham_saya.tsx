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
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import dataDummy from "../dummy/data_dummy.json";

export default function InvestasiSahamTerbeli() {
  const router = useRouter();
  return (
    <>

      {dataDummy.map((e) => (
        <Card
          key={e.id}
          withBorder
          bg={"gray.5"}
          mb={"lg"}
          onClick={() =>
            router.push(RouterInvestasi.detail_saham_terbeli + `${e.id}`)
          }
        >
          <CardSection>
            <Group position="left" mt={"sm"} px={"md"}>
              <Flex align={"center"} gap={"xs"}>
                <Avatar src={"/aset/avatar.png"} />
                <Text>Username</Text>
              </Flex>
            </Group>
          </CardSection>
          <CardSection p={"xs"}>
            <AspectRatio ratio={16 / 9}>
              {/* {e.imagesId ? (
                        <Image alt="" src={`/api/investasi/gambar/${e.imagesId}`} />
                      ) : (
                        <Image alt="" src={"/aset/no-img.png"} />
                      )} */}
              <Image alt="" src={"/aset/no-img.png"} />
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
            <Group position="apart">
              {e.statusSaham.id === 1 ? (
                <Badge variant="dot">{e.statusSaham.status}</Badge>
              ) : (
                <Badge variant="dot" color="red">
                  {e.statusSaham.status}
                </Badge>
              )}

              {(() => {
                if (
                  e.masterPencarianInvestorId -
                    moment(new Date()).diff(new Date(e.createdAt), "days") <=
                  0
                ) {
                  return (
                    <>
                      <Group position="center">
                        <IconCircleCheck color="green" />
                        <Text>Selesai</Text>
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
