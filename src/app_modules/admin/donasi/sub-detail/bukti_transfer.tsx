"use client";

import { AspectRatio, Box, Image, Paper, Stack } from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../component_global/back_button";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";

export default function AdminDonasi_BuktiTransfer({
  imageId,
}: {
  imageId: string;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_BackButton />
        <BuktiTransfer imageId={imageId} />
      </Stack>
    </>
  );
}

function BuktiTransfer({ imageId }: { imageId: string }) {
  return (
    <>
      <Paper withBorder  p={"lg"} bg={"gray.3"}>
        <AspectRatio ratio={2 / 1}  mx="auto">
          <Image
            alt="Foto"
            src={RouterAdminDonasi_OLD.api_gambar_bukti_transfer + `${imageId}`}
          />
        </AspectRatio>
        {/* <AspectRatio ratio={1 / 1} mah={500} p={"lg"} bg={"cyan"}>
          <Paper bg={"grape"} h={"100%"}>
            <Image
            //   height={500}
            //   width={"100%"}
              alt="Foto"
              src={
                RouterAdminDonasi_OLD.api_gambar_bukti_transfer + `${imageId}`
              }
            />
          </Paper>
        </AspectRatio> */}
      </Paper>
    </>
  );
}
