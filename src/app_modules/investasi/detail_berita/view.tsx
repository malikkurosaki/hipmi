"use client";

import { AspectRatio, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Model_Berita_Investasi } from "../model/model_investasi";
import { useState } from "react";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import moment from "moment";

export default function DetailBeritaInvestasi({
  dataBerita,
}: {
  dataBerita: Model_Berita_Investasi;
}) {
  const [berita, setBerita] = useState(dataBerita);
  return (
    <>
      <Stack spacing={"lg"}>
        <Stack spacing={0}>
          <Title>{berita.title}</Title>
          <Text fz={12}>{moment(berita.createdAt).format("lll")}</Text>
        </Stack>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={RouterInvestasi.api_gambar + `${berita.imagesId}`}
            alt=""
          />
        </AspectRatio>
        <Text>{berita.deskripsi}</Text>
      </Stack>
    </>
  );
}
