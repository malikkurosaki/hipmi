import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { Stack, Text, Title } from "@mantine/core";
import { Prisma } from "@prisma/client";
import { useState } from "react";

export function Investasi_ViewDetailBerita({
  dataBerita,
}: {
  dataBerita: any;
}) {
  const [data, setData] =
    useState<Prisma.BeritaInvestasiGetPayload<{}>>(dataBerita);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          {data.imageId == null ? (
            ""
          ) : (
            <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />
          )}

          <Title order={4} align="center">
            {" "}
            {data.title}
          </Title>

          <Text>{data.deskripsi}</Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
