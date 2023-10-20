"use client";

import { ApiHipmi } from "@/app/lib/api";
import { INVESTASI } from "@/app_modules/models/investasi";
import { MODEL_ALL_MASTER } from "@/app_modules/models/model_AllMaster";
import {
  AspectRatio,
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

export default function MainInvestasi({
  listData,
  pencarianInvestor,
  periodeDeviden,
  pembagianDeviden,
}: {
  listData: INVESTASI[];
  pencarianInvestor: MODEL_ALL_MASTER[];
  periodeDeviden: MODEL_ALL_MASTER[];
  pembagianDeviden: MODEL_ALL_MASTER[];
}) {
  const router = useRouter();
  return (
    <>
      <pre>{/* {JSON.stringify(listData, null, 2)} */}</pre>
      {listData.map((e) => (
        <Card key={e.id} p={"md"} withBorder mb={"lg"}>
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
            <Box mt={"md"}>
              <Slider
                size={10}
                labelAlwaysOn
                marks={[
                  // { value: 25, label: '25%' },
                  // { value: 50, label: '50%' },
                  // { value: 75, label: '75%' },
                  { value: 100, label: "100%" },
                ]}
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
            <Group position="right">
              <Text>Selesai</Text>
            </Group>
          </CardSection>
        </Card>
      ))}
    </>
  );
}
