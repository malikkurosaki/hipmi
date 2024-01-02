"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MODEL_CERITA_DONASI } from "@/app_modules/donasi/model/interface";
import { Box, Image, Stack, Text } from "@mantine/core";
import moment from "moment";
import { useState } from "react";

export default function CeritaPenggalangDonasi({
  dataCerita,
}: {
  dataCerita: MODEL_CERITA_DONASI;
}) {
  const [data, setData] = useState(dataCerita);
  return (
    <>
      {/* <pre>{JSON.stringify(data.imageCeritaDonasi, null, 2)}</pre> */}
      <Stack>
        {moment(data.createdAt).format("ll")}
        <Text fw={"bold"}> #HaloOrangBaik</Text>
        <Text>{data.pembukaan}</Text>
        <Image
          alt="Foto"
          src={RouterDonasi.api_image_cerita + `${data.imageCeritaDonasi.url}`}
        />
        <Text>{data.cerita}</Text>
      </Stack>
    </>
  );
}
