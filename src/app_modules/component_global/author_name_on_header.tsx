"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Stack, Grid, Avatar, Divider, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "./notif_global/notifikasi_peringatan";

export default function ComponentGlobal_AuthorNameOnHeader({
  profileId,
  imagesId,
  authorName,
}: {
  profileId?: string;
  imagesId?: string;
  authorName?: string;
}) {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (profileId) {
                router.push(RouterProfile.katalog + profileId);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={30}
              sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
              radius={"xl"}
              bg={"gray.1"}
              src={
                imagesId
                  ? RouterProfile.api_foto_profile + imagesId
                  : "/aset/global/avatar.png"
              }
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Text truncate fz={"sm"} fw={"bold"}>
                {authorName ? authorName : "Nama author"}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider />
      </Stack>
    </>
  );
}
