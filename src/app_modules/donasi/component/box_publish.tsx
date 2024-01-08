"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  SimpleGrid,
  Box,
  Stack,
  Grid,
  AspectRatio,
  Paper,
  Progress,
  Divider,
  Image,
  Text,
} from "@mantine/core";
import router from "next/router";
import ComponentDonasi_TampilanHitungMundur from "./tampilan_hitung_mundur";
import TampilanRupiahDonasi from "./tampilan_rupiah";
import { MODEL_DONASI } from "../model/interface";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentDonasi_BoxPublish({
  dataDonasi,
  path,
}: {
  dataDonasi: MODEL_DONASI[];
  path: string;
}) {
  const { height, width } = useViewportSize();
  const router = useRouter();
  const [donasi, setDonasi] = useState(dataDonasi);
  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {donasi.map((e, i) => (
          <Box
            key={i}
            onClick={
              () => router.push(path + `${e.id}`)
              // toast("Cooming soon")
            }
          >
            <Stack>
              <Grid>
                <Grid.Col span={7}>
                  <AspectRatio ratio={16 / 9}>
                    <Paper radius={"md"}>
                      <Image
                        alt="Foto"
                        src={RouterDonasi.api_gambar + `${e.imagesId}`}
                        radius={"md"}
                      />
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Stack spacing={"xs"}>
                    <Stack spacing={0}>
                      <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                        {e.title}
                      </Text>
                      <ComponentDonasi_TampilanHitungMundur
                        durasi={e.DonasiMaster_Durasi.name}
                        publishTime={e.publishTime}
                        textSize={10}
                      />
                    </Stack>
                    <Progress value={+e.progres} color="orange" />
                    <Stack spacing={0}>
                      <Text fz={"sm"}>Terkumpul</Text>
                      <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                        <TampilanRupiahDonasi nominal={+e.terkumpul} />
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>
              {width > 575 ? "" : <Divider />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
