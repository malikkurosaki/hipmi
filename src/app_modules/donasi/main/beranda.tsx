"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Warna } from "@/app/lib/warna";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function MainDonasi() {
  const router = useRouter();
  const { height, width } = useViewportSize();
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
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Box key={i} onClick={() => router.push(RouterDonasi.detail_main)}>
              <Stack>
                <Grid>
                  <Grid.Col span={7}>
                    <AspectRatio ratio={16 / 9}>
                      <Paper radius={"md"}>
                        <Image
                          alt="Foto"
                          src={"/aset/no-img.png"}
                          radius={"md"}
                        />
                      </Paper>
                    </AspectRatio>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Stack spacing={"xs"}>
                      <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                        Judul Donasi Bisa Dilihat Disini Untuk Contoh
                      </Text>
                      <Progress value={50} color="orange" />
                      <Stack spacing={0}>
                        <Text fz={"sm"}>Terkumpul</Text>
                        <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                          Rp. 100.000.000
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
