import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Title,
  Slider,
  Divider,
  Group,
  Badge,
  Image,
  Text,
  Center,
  Grid,
  Stack,
  Paper,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  MODEL_Investasi,
  MODEL_Status_investasi,
} from "../model/model_investasi";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { IconChecklist, IconCircleCheck } from "@tabler/icons-react";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";

export default function Publish({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();
  const [sisaWaktu, setSisaWaktu] = useState();

  if (_.isEmpty(data))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      </>
    );

  return (
    <>
      {data.map((e) => (
        <Paper
          key={e.id}
          withBorder
          mb={"md"}
          p={"xs"}
          onClick={() =>
            router.push(RouterInvestasi.detail_publish + `${e.id}`)
          }
        >
          <Grid>
            <Grid.Col span={8}>
              <Text fw={"bold"}> {_.capitalize(e.title)}</Text>
              <Stack spacing={0}>
                <Text fz={10}>Target Dana:</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+e.targetDana)}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={4}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"md"}>
                  <Image
                    alt=""
                    src={RouterInvestasi.api_gambar + `${e.imagesId}`}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
          </Grid>
          <Divider my={"xs"} />
          <Group position="center">
            {Number(e.MasterPencarianInvestor.name) -
              moment(new Date()).diff(new Date(e.updatedAt), "days") <=
            0 ? (
              <Group position="right">
                <IconCircleCheck color="green" />
                <Text c={"green"}>Selesai</Text>
              </Group>
            ) : (
              <Group position="center">
                {/* <Badge color="green" variant="dot">
                  Publish
                </Badge> */}
                <Group>
                  {Number(e.MasterPencarianInvestor.name) -
                    moment(new Date()).diff(new Date(e.countDown), "days") <=
                  0 ? (
                    <Group>
                      <IconChecklist />
                      <Text>Selesai</Text>
                    </Group>
                  ) : (
                    <Box>
                      Sisa Waktu : {}
                      {Number(e.MasterPencarianInvestor.name) -
                        moment(new Date()).diff(new Date(e.countDown), "days")} hari
                    </Box>
                  )} 
                </Group>
              </Group>
            )}
          </Group>
        </Paper>
      ))}
    </>
  );
}
