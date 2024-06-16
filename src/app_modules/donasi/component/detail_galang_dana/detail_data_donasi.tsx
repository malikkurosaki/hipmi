"use client";

import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  Stack,
  AspectRatio,
  Paper,
  Title,
  Group,
  Image,
  Text,
} from "@mantine/core";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export default function ComponentDonasi_DetailDataGalangDana({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  return (
    <>
      <Stack px={"xs"}>
        <Stack>
          <Image
            alt="Foto"
            src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
          />
          {/* <AspectRatio ratio={9 / 16} maw={500} mah={1000} bg={"blue"}>
          </AspectRatio> */}
          <Stack spacing={0}>
            <Title order={4}>{donasi.title}</Title>
            <Text fz={10}>Durasi: {donasi.DonasiMaster_Durasi.name} hari</Text>
          </Stack>
          <Stack spacing={0}>
            <Group position="apart">
              <Stack spacing={0}>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title order={4} c="blue">
                  <TampilanRupiahDonasi nominal={+donasi.target} />
                </Title>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title order={4} c="blue">
                  {donasi.DonasiMaster_Ketegori.name}
                </Title>
              </Stack>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
