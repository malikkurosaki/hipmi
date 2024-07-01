"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Center,
  Avatar,
  Stack,
  Button,
  Divider,
  Grid,
  Text,
} from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function ComponentForum_ViewForumProfile({
  auhtorSelectedData,
  totalPosting,
}: {
  auhtorSelectedData: MODEL_USER;
  totalPosting: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // if (loading) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      <Center>
        <Avatar
          radius={"100%"}
          sx={{
            borderStyle: "solid",
            borderWidth: "0.5px",
            borderColor: "black",
          }}
          size={100}
          alt="foto"
          src={
            RouterProfile.api_foto_profile +
            auhtorSelectedData?.Profile?.imagesId
          }
        />
      </Center>
      <Grid>
        <Grid.Col span={"auto"}>
          <Stack spacing={0}>
            <Text lineClamp={1} fw={"bold"} color={"white"}>
              {auhtorSelectedData?.Profile?.name}
            </Text>
            <Grid gutter={"xs"}>
              <Grid.Col span={"content"}>
                <Text lineClamp={1} color={"white"} fz={"sm"}>
                  {totalPosting} Posting <IconCircleFilled size={5} />
                </Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1} color={"white"} fz={"sm"}>
                  @{auhtorSelectedData?.username}
                  {""}
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
        <Grid.Col span={5}>
          <Stack align="center" justify="center" h={"100%"}>
            <Button
              style={{
                border: `1px solid ${AccentColor.yellow}`,
                backgroundColor: MainColor.yellow,
              }}
              c="white"
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              variant="outline"
              onClick={() => {
                setLoading(true);
                router.push(
                  RouterProfile.katalog + auhtorSelectedData?.Profile?.id
                );
              }}
            >
              Kunjungi Profile
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
