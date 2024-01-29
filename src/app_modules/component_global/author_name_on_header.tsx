"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Stack, Grid, Avatar, Divider, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ComponentGlobal_AuthorNameOnHeader({
  profileId,
  imagesId,
  authorName,
}: {
  profileId: string;
  imagesId: string;
  authorName: string;
}) {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              router.push(RouterProfile.katalog + profileId);
            }}
          >
            <Avatar
              size={30}
              sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
              radius={"xl"}
              bg={"gray.1"}
              src={RouterProfile.api_foto_profile + imagesId}
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Text truncate fz={"sm"} fw={"bold"}>
                {authorName}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider />
      </Stack>
    </>
  );
}
