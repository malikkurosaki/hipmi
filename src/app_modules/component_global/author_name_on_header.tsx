"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Stack, Grid, Avatar, Divider, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "./notif_global/notifikasi_peringatan";
import moment from "moment";

export default function ComponentGlobal_AuthorNameOnHeader({
  profileId,
  imagesId,
  authorName,
  tglPublish,
  isPembatas,
}: {
  profileId?: string;
  imagesId?: string;
  authorName?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
}) {
  const router = useRouter();
  const skrng = new Date();
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
              <Group position="apart">
                <Stack justify="center" h={"100%"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {authorName ? authorName : "Nama author"}
                  </Text>
                </Stack>
                <Stack justify="center" h={"100%"}>
                  {tglPublish ? (
                    <Text c={"gray"} fz={"xs"}>
                      {skrng.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  ) : (
                    ""
                  )}
                </Stack>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
