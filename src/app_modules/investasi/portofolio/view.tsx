"use client";

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardSection,
  Collapse,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dataDummy from "../dummy/data_dummy.json";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IconCaretDown, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDisclosure } from "@mantine/hooks";
import { Warna } from "@/app/lib/warna";
import { RouteInvestasi } from "@/app/lib/app_route";

export default function PortofolioInvestasi() {
  const router = useRouter();
  return (
    <>
      <MyPortofolioInvestasi />
      <SahamTerbeli />
    </>
  );
}

function MyPortofolioInvestasi() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  return (
    <Box mx="auto">
      <Paper mb={5} onClick={toggle} bg={Warna.biru} px={"md"} h={40}>
        <Group position="apart" align="center" h={40}>
          <Title order={6}>Portofolio Saya</Title>
          <IconCaretDown />
        </Group>
      </Paper>

      <Collapse in={opened} transitionDuration={700}>
        {dataDummy.map((e) => (
          <Card
            key={e.id}
            withBorder
            mb={"lg"}
            onClick={() => router.push(`/dev/investasi/detail_porto/${e.id}`)}
          >
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
              <Box mt={"md"}>
                <Slider
                  size={10}
                  disabled
                  labelAlwaysOn
                  value={e.persentase}
                  marks={[{ value: e.persentase, label: e.persentase + `%` }]}
                />
                <Title order={4}>{e.title}</Title>
              </Box>
            </CardSection>
            <Divider />
            <CardSection p={"md"}>
              {(() => {
                if (
                  e.masterPencarianInvestorId -
                    moment(new Date()).diff(new Date(e.createdAt), "days") ===
                  0
                ) {
                  return (
                    <>
                      <Group position="right">
                        <IconCircleCheck />
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
            </CardSection>
          </Card>
        ))}
      </Collapse>
    </Box>
  );
}

function SahamTerbeli() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <>
      <Box maw={400} mx="auto">
        <Paper mb={5} onClick={toggle} bg={Warna.hijau_tua} px={"md"} h={40}>
          <Group position="apart" align="center" h={40}>
            <Title order={6}>Saham Saya</Title>
            <IconCaretDown />
          </Group>
        </Paper>

        <Collapse in={opened} transitionDuration={700}>
          {dataDummy.map((e) => (
            <Card
              key={e.id}
              withBorder
              mb={"lg"}
              onClick={() =>
                router.push(RouteInvestasi.detail_saham_terbeli + `${e.id}`)
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
                <Box mt={"md"}>
                  <Slider
                    size={10}
                    disabled
                    labelAlwaysOn
                    value={e.persentase}
                    marks={[{ value: e.persentase, label: e.persentase + `%` }]}
                  />
                  <Title order={4}>{e.title}</Title>
                </Box>
                <Box mt={"md"}>
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
                {(() => {
                  if (
                    e.masterPencarianInvestorId -
                      moment(new Date()).diff(new Date(e.createdAt), "days") ===
                    0
                  ) {
                    return (
                      <>
                        <Group position="right">
                          <IconCircleCheck />
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
              </CardSection>
            </Card>
          ))}
        </Collapse>
      </Box>
    </>
  );
}
