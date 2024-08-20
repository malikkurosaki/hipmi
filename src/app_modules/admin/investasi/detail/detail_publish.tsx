"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface"; 
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Image,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { IconCircleCheck, IconHome } from "@tabler/icons-react";
import investasi from "../../notifikasi/route_setting/investasi";

export function AdminInvestasi_DetailPublish({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_BackButton />
        <SimpleGrid cols={2}>
          <InformasiAuthor data={data} />
          <InformasiDataInvestasi data={data} />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function InformasiAuthor({ data }: { data: MODEL_INVESTASI }) {
  return (
    <>
      <Paper withBorder>
        <Stack p={"lg"} spacing={"xl"}>
          <Title align="center" order={3}>
            {data.title}
          </Title>

          <AspectRatio ratio={1 / 1} mah={300}>
            <Center>
              <Image
                bg={"blue"}
                style={{ borderRadius: "10px" }}
                radius={"md"}
                width={250}
                alt=""
                src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
              />
            </Center>
          </AspectRatio>

          <Stack spacing={"sm"}>
            <Title order={4}>Informasi pemilik</Title>

            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleCheck size="1rem" />
                </ThemeIcon>
              }
            >
              <List.Item>{data.author.username}</List.Item>
              <List.Item>+{data.author.nomor}</List.Item>
              <List.Item>{data.author.Profile.email}</List.Item>
            </List>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

function InformasiDataInvestasi({ data }: { data: MODEL_INVESTASI }) {
  return (
    <>
      <Paper withBorder p={"lg"}>
        <Stack>
          <Title order={3}>Rincian Data Investasi</Title>
          <Grid justify="center">
            <Grid.Col>
              <Grid mt={"md"} justify="center">
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>Dana Dibutuhkan</Text>
                      <Text fw={"bold"}>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumFractionDigits: 10,
                        }).format(+data.targetDana)}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Harga Per Lembar</Text>
                      <Text fw={"bold"}>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumFractionDigits: 10,
                        }).format(+data.hargaLembar)}{" "}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Jadwal Pembagian</Text>
                      <Text fw={"bold"}>
                        {data.MasterPembagianDeviden.name} bulan{" "}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Pencarian Investor</Text>
                      <Text fw={"bold"}>
                        {data.MasterPencarianInvestor.name} hari{" "}
                      </Text>
                    </Box>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack>
                    <Box>
                      <Text>ROI</Text>
                      <Text fw={"bold"}>{data.roi} %</Text>
                    </Box>
                    <Box>
                      <Text>Total Lembar</Text>
                      <Text fw={"bold"}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumFractionDigits: 10,
                        }).format(+data.totalLembar)}{" "}
                        lembar
                      </Text>
                    </Box>
                    <Box>
                      <Text>Pembagian Deviden</Text>
                      <Text fw={"bold"}>{data.MasterPeriodeDeviden.name}</Text>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
