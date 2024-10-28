"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { MODEL_DONASI_KABAR } from "@/app_modules/donasi/model/interface";
import { Group, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function KabarDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI_KABAR;
}) {
  const [kabar, setKabar] = useState(dataDonasi);
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Group position="right">
            <Text>
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                kabar.createdAt
              )}
            </Text>
          </Group>

          {kabar.imageId === null ? (
            ""
          ) : (
            <ComponentGlobal_LoadImageLandscape fileId={kabar.imageId} />
          )}
          <Title align="center" order={4}>
            {kabar.title}
          </Title>
          <Text>{kabar.deskripsi}</Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
