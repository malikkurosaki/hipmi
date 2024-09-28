"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { Center, Image, Stack } from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../component_global/back_button";

export default function AdminJob_DetailPoster({
  imageId,
}: {
  imageId: string;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_BackButton />
        <Center>
          <Image
            alt="Foto"
            src={RouterJob.api_gambar + imageId}
            mah={500}
            maw={300}
          />
        </Center>
      </Stack>
    </>
  );
}
