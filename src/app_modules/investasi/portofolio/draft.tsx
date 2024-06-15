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
  Paper,
  Grid,
  Flex,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_Investasi } from "../model/model_investasi";
import _ from "lodash";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";

export default function Draft({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();
  // console.log(data)

  if (_.isEmpty(data))
    return (
      <>
        <ComponentInvestasi_IsEmptyData text="Tidak ada data" />
      </>
    );

  return (
    <>
      {/* <pre> {JSON.stringify(data,null, 2)}</pre> */}
      {data.map((e) => (
        <Paper
          // sx={{ borderStyle: "solid", borderColor: "yellow", borderWidth: "0.5px" }}
          p={"xs"}
          key={e.id}
          mb={"md"}
          withBorder
          onClick={() => router.push(RouterInvestasi.detail_draft + `${e.id}`)}
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
        </Paper>
      ))}
    </>
  );
}
