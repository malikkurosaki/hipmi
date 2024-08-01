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
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentDonasi_DetailDataGalangDana({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  return (
    <>
      <Stack
        style={{
          paddingInline: "15px",
          paddingBottom: "15px",
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Stack>
          <AspectRatio
            ratio={1 / 1}
            mx={"sm"}
            mah={300}
          >
            <Image
              alt="Foto"
              src={RouterDonasi.api_image + `${donasi.imageDonasi.url}`}
              radius={"sm"}
            />
          </AspectRatio>
          <Stack spacing={0}>
            <Title order={4}>{donasi.title}</Title>
            <Text fz={10}>Durasi: {donasi.DonasiMaster_Durasi.name} hari</Text>
          </Stack>
          <Stack spacing={0}>
            <Group position="apart">
              <Stack spacing={0}>
                <Text fz={12}>Dana dibutuhkan</Text>
                <Title order={4} style={{
                  color: MainColor.yellow
                }}>
                  <TampilanRupiahDonasi nominal={+donasi.target} />
                </Title>
              </Stack>
              <Stack spacing={0}>
                <Text fz={12}>Kategori</Text>
                <Title order={4} style={{
                  color: MainColor.yellow
                }}>
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
