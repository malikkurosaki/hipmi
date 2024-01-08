"use client";

import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import AdminDonasi_TombolKembali from "../component/tombol_kembali";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";

export default function AdminDonasi_DetailReject({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataReject);

  return (
    <>
      <Stack>
        <ButtonOnHeader />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <TampilanDetailDonasi donasi={donasi} />
          <CatatanReject catatan={donasi.catatan} />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ButtonOnHeader() {
  return (
    <>
      <Stack>
        <Group position="apart">
          <AdminDonasi_TombolKembali />
          <Button radius={"xl"} bg={"orange"} color="orange">
            Tambah catatan
          </Button>
        </Group>
        <Divider />
      </Stack>
    </>
  );
}

function TampilanDetailDonasi({ donasi }: { donasi: MODEL_DONASI }) {
  return (
    <>
      <Paper radius={"md"} p={"md"}>
        <Stack>
          <Stack>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                <Image
                  alt="Foto"
                  src={RouterDonasi.api_gambar + `${donasi.imagesId}`}
                />
              </Paper>
            </AspectRatio>
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
                  <TampilanRupiahDonasi nominal={+donasi.target} />
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

function CatatanReject({ catatan }: { catatan: string }) {
  return (
    <>
      <Stack>
        <Title order={6}>Alasan Penolakan</Title>
        <Text>{catatan}</Text>
      </Stack>
    </>
  );
}
