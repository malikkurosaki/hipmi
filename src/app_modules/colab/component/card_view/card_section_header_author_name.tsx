"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Avatar, Card, Divider, Grid, Stack, Text } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { useRouter } from "next/navigation";

export default function ComponentColab_CardSectionHeaderAuthorName({
  profileId,
  imagesId,
  authorName,
  tglPublish,
  isPembatas,
  jumlah_partisipan,
}: {
  profileId?: string;
  imagesId?: string;
  authorName?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  jumlah_partisipan?: any[]
}) {
  const router = useRouter();

  return (
    <>
      <Card.Section px={"md"}>
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
                <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                  {authorName ? authorName : "Nama author"}
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={"content"}>
              <Stack justify="center" h={"100%"}>
                {tglPublish ? (
                  <Text c={"gray"} fz={"xs"}>
                    {new Intl.DateTimeFormat("id-ID").format(tglPublish)}
                  </Text>
                ) : (
                  ""
                )}
              </Stack>
            </Grid.Col>
          </Grid>
          {isPembatas ? <Divider /> : ""}
        </Stack>
      </Card.Section>
    </>
  );
}
