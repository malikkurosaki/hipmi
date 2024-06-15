"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Group,
  Image,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_Investasi } from "../model/model_investasi";
import { useState } from "react";
import _ from "lodash";

export default function BeritaInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const router = useRouter();
  const [berita, setBerita] = useState(dataInvestasi);

  return (
    <>
      {!_.isEmpty(berita.BeritaInvestasi) ? (
        berita.BeritaInvestasi.map((e) => (
          <Paper
            key={e.id}
            mb={"md"}
            w={"100%"}
            bg={"gray"}
            p={"sm"}
            onClick={() =>
              router.push(RouterInvestasi.detail_berita + `${e.id}`)
            }
          >
            <Stack>
              <Group position="apart">
                <Title order={6}>{e.title}</Title>
                <Text fz={"xs"}>{moment(e.createdAt).format("LL")}</Text>
              </Group>

              <Grid pt={5}>
                <Grid.Col span={8}>
                  <Text lineClamp={3} fz={12}>
                    {e.deskripsi}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <AspectRatio ratio={16 / 9} h={50} w={100}>
                    <Image alt="" src={RouterInvestasi.api_gambar + `${e.imagesId}`} />
                  </AspectRatio>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        ))
      ) : (
        <Center>
          <Title order={6}>Tidak Ada Berita</Title>
        </Center>
      )}
    </>
  );
}
