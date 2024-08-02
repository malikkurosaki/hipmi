"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentDonasi_CardPublish from "@/app_modules/donasi/component/card_view/box_publish";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_INFO_PENGGALANG,
} from "@/app_modules/donasi/model/interface";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  AspectRatio,
  Box,
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
  Title
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconBrandGmail,
  IconMoodSmile,
  IconPhone
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PenggalangDanaDonasi({
  dataPenggalang,
}: {
  dataPenggalang: MODEL_DONASI_INFO_PENGGALANG;
}) {
  const [value, setValue] = useState(dataPenggalang);

  return (
    <>
      <Stack>
        <InformasiPenggalang value={value as any} />
        {value.Donasi.map((e, i) => (
          <Box key={i}>
            <ComponentDonasi_CardPublish
              data={e}
              path={RouterDonasi.detail_publish}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}

function InformasiPenggalang({ value }: { value: MODEL_USER }) {
  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Box
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "20px",
          cursor: "pointer",
          borderRadius: "10px",
          color: "white",
          marginBottom: "10px",
        }}
      >
        <Stack
        
          spacing={"xl"}
        >
          <Stack align="center" spacing={0}>
            <Paper
              radius={"100%"}
              h={100}
              w={100}
              sx={{ borderStyle: "solid" }}
            >
              <Center h={"100%"}>
                <Image
                  radius={"100%"}
                  width={100}
                  height={100}
                  alt="Foto"
                  src={
                    RouterProfile.api_foto_profile + value?.Profile?.imagesId
                  }
                />
              </Center>
            </Paper>
            <Title order={3}>@{value?.username}</Title>
          </Stack>
          <Stack>
            <Group>
              <IconMoodSmile />
              <Text>{value?.Profile.name}</Text>
            </Group>
            <Group>
              <IconPhone />
              <Text>+{value?.nomor}</Text>
            </Group>
            <Group>
              <IconBrandGmail />
              <Text>{value?.Profile?.email}</Text>
            </Group>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

function DataPengganganDana({ donasi }: { donasi: MODEL_DONASI[] }) {
  const router = useRouter();
  const { height, width } = useViewportSize();
  return (
    <>
      <Title order={5}>Peggalangan Dana Yang Dilakukan</Title>
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
            onClick={() => router.push(RouterDonasi.detail_main + `${e.id}`)}
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
                    <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                      {e.title}
                    </Text>
                    <Progress value={50} color="orange" />
                    <Stack spacing={0}>
                      <Text fz={"sm"}>Terkumpul</Text>
                      <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                        <TampilanRupiahDonasi nominal={+e.target} />
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
