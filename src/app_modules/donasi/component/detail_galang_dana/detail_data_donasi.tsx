"use client";

import {
  MainColor
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export default function ComponentDonasi_DetailDataGalangDana({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentGlobal_LoadImageLandscape fileId={donasi.imageId} />
          <Stack spacing={0}>
            <Title order={4}>{donasi.title}</Title>
            <Text fz={10}>Durasi: {donasi.DonasiMaster_Durasi.name} hari</Text>
          </Stack>
          <Stack spacing={0}>
            <Group position="apart">
              <Stack spacing={0}>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title
                  order={4}
                  style={{
                    color: MainColor.yellow,
                  }}
                >
                  <TampilanRupiahDonasi nominal={+donasi.target} />
                </Title>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title
                  order={4}
                  style={{
                    color: MainColor.yellow,
                  }}
                >
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Stack>
            </Group>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
