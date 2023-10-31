"use client";

import {
  AspectRatio,
  Avatar,
  Badge,
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
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export default function PortofolioInvestasi() {
  const router = useRouter();
  return (
    <>
      <MyPortofolioInvestasi />
      <Divider my={"lg"} />
      <SahamTerbeli />
    </>
  );
}

function MyPortofolioInvestasi() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  return (
    <>
      <Title mb={"md"} order={4}>
        Portofolio Saya
      </Title>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        swipeable={true}
      >
        {dataDummy.map((e) => (
          <Card
            key={e.id}
            withBorder
            mb={40}
            bg={"gray.5"}
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
            <Divider />
            <CardSection p={"md"}>
              <Group position="apart">
                {(() => {
                  if (e.statusPorto.id === 1) {
                    return (
                      <Badge color="yellow" variant="outline">
                        {e.statusPorto.status}
                      </Badge>
                    );
                  } else {
                    if (e.statusPorto.id === 2) {
                      return (
                        <Badge color="red" variant="outline">
                          {e.statusPorto.status}
                        </Badge>
                      );
                    } else {
                      return (
                        <Badge color="green" variant="outline">
                          {e.statusPorto.status}
                        </Badge>
                      );
                    }
                  }
                })()}

                {(() => {
                  if (
                    e.masterPencarianInvestorId -
                      moment(new Date()).diff(new Date(e.createdAt), "days") <=
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
              </Group>
            </CardSection>
          </Card>
        ))}
      </Carousel>
    </>
  );
}

function SahamTerbeli() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <>
      <Title mb={"md"} order={4}>
        Saham Saya
      </Title>
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
