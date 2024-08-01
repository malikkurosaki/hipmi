"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Paper,
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  AspectRatio,
  Image,
  Divider,
} from "@mantine/core";
import moment from "moment";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { useState } from "react";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function DetailKabarDonasi({dataDonasi}: {dataDonasi: MODEL_DONASI_KABAR}) {
  const [kabar, setKabar] = useState(dataDonasi)
  return (
    <>
      <Stack
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          marginBottom: "15px",
        }}
      >
        <Stack>
          <Group position="right">
            <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
          </Group>
          <Title align="center" order={4}>{kabar.title}</Title>
          {kabar.imagesId === null ? (
            ""
          ) : (
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                <Image
                  alt="Foro"
                  src={RouterDonasi.api_gambar_kabar + `${kabar.imagesId}`}
                />
              </Paper>
            </AspectRatio>
          )}
          <Text>{kabar.deskripsi}</Text>
        </Stack>
      </Stack>
    </>
  );
}
