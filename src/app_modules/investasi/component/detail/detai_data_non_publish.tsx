import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  Stack,
  Box,
  AspectRatio,
  Center,
  Title,
  Grid,
  Paper,
  Flex,
  ActionIcon,
  Image,
  Text,
  SimpleGrid,
} from "@mantine/core";
import _ from "lodash";
import { MODEL_Investasi } from "../../model/model_investasi";
import { IconBookDownload, IconFileDescription } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function ComponentInvestasi_DetailDataNonPublish({
  data,
}: {
  data: MODEL_Investasi;
}) {
  const router = useRouter();
  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} />,
      route: RouterInvestasi.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} />,
      route: RouterInvestasi.detail_dokumen,
    },
  ];

  return (
    <>
      <Stack
        style={{
          paddingInline: "15px",
          paddingBlock: "15px",
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <AspectRatio ratio={1 / 1} mx={"sm"} mah={300}>
          <Image
            alt=""
            src={RouterInvestasi.api_gambar + `${data.imagesId}`}
            radius={"sm"}
            height={300}
            width={"100%"}
          />
        </AspectRatio>

        {/* Title dan Persentase */}
        <Center>
          <Title order={3} align="center">
            {_.startCase(data.title)}
          </Title>
        </Center>

        {/* Rincian Data */}
        <Grid p={"md"}>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Dana Dibutuhkan</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 20,
                  }).format(+data.targetDana)}
                </Text>
              </Box>
              <Box>
                <Text>Harga Per Lembar</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.hargaLembar)}
                </Text>
              </Box>
              <Box>
                <Text>Jadwal Pembagian</Text>
                <Text>{data.MasterPembagianDeviden.name} Bulan </Text>
              </Box>
              <Box>
                <Text>Pencarian Investor</Text>
                <Text>{data.MasterPencarianInvestor.name} Hari </Text>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>ROI</Text>
                <Text>{data.roi} %</Text>
              </Box>
              <Box>
                <Text>Total Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.totalLembar)}{" "}
                  lembar
                </Text>
              </Box>
              <Box>
                <Text>Pembagian Deviden</Text>
                <Text>{data.MasterPeriodeDeviden.name}</Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* List Box */}
        <SimpleGrid cols={2}>
          {listBox.map((e) => (
            <Center key={e.id}>
              <Paper
                style={{
                  width: 100,
                  padding: "15px",
                  backgroundColor: AccentColor.blue,
                  border: `2px solid ${AccentColor.softblue}`,
                  borderRadius: "10px",
                  color: "white",
                }}
                onClick={() => router.push(e.route + `${data.id}`)}
              >
                <Stack spacing={0} align="center">
                  <Text fz={12}>{e.name}</Text>
                  <ActionIcon
                    variant="transparent"
                    size={60}
                    style={{ color: "white" }}
                  >
                    {e.icon}
                  </ActionIcon>
                </Stack>
              </Paper>
            </Center>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
