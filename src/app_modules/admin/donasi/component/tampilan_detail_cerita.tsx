"use client"

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MODEL_CERITA_DONASI } from "@/app_modules/donasi/model/interface";
import { Paper, Stack, Title, Box, AspectRatio, Image, Text } from "@mantine/core";

export default function ComponentAdminDonasi_CeritaPenggalangDana({
  cerita,
}: {
  cerita: MODEL_CERITA_DONASI;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(cerita, null, 2)}</pre> */}
      <Paper radius={"md"} p={"md"} withBorder>
        <Stack>
          <Title order={5}>Cerita Penggalang Dana</Title>
          <Text>{cerita.pembukaan}</Text>

          <Box>
            <AspectRatio ratio={16 / 9} mah={300} mx={"auto"}>
              <Image
                alt="Gambar_cerita"
                src={RouterDonasi.api_gambar_cerita + `${cerita.imagesId}`}
              />
            </AspectRatio>
          </Box>

          <Text>{cerita.cerita}</Text>
        </Stack>
      </Paper>
    </>
  );
}