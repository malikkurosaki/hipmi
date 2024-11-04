"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Paper,
  Stack,
  Title,
  Box,
  AspectRatio,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { Admin_ComponentLoadImageLandscape } from "../../_admin_global";
import ComponentAdminGlobal_TampilanRupiahDonasi from "../../_admin_global/tampilan_rupiah";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";

export default function ComponentAdminDonasi_TampilanDetailDonasi({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  return (
    <>
      <Paper radius={"md"} p={"md"} withBorder>
        <Stack>
          <Title order={5}>Detail Data Donasi</Title>
          <Stack>
            <Box>
              <Admin_ComponentLoadImageLandscape fileId={donasi.imageId} />
            </Box>

            <Stack spacing={0}>
              <Title order={4}>{donasi.title}</Title>
              <Text fz={"xs"}>
                Durasi: {donasi.DonasiMaster_Durasi.name} hari
              </Text>
            </Stack>

            <Stack spacing={0}>
              <Group>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title order={4} c="blue">
                  <ComponentGlobal_TampilanRupiah
                    color="black"
                    nominal={+donasi.target}
                  />
                </Title>
              </Group>
              <Group>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Group>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
