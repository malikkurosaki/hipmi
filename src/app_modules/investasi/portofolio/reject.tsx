import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Card,
  CardSection,
  AspectRatio,
  Box,
  Title,
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
import { useState } from "react";
import _ from "lodash";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";

export default function Reject({ data }: { data: MODEL_Investasi[] }) {
  const [investasi, setInvestasi] = useState(data);
  const router = useRouter();

  if (_.isEmpty(data))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      </>
    );

  return (
    <>

      {investasi.map((e) => (
        <Paper
          key={e.id}
          withBorder
          mb={"md"}
          p={"xs"}
          onClick={() => router.push(RouterInvestasi.detail_reject + `${e.id}`)}
        >
          <Grid>
            <Grid.Col span={8}>
              <Text fw={"bold"}> {_.capitalize(e.title)}</Text>
              <Stack spacing={0}>
                <Text fz={10}>Target Dana:</Text>
              <Text>
                Rp. {new Intl.NumberFormat("id-ID", {
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
        </Paper>
      ))}
    </>
  );
}
