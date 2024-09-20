"use client";

import { APIs } from "@/app/lib";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import { ComponentMap_SkeletonDrawerDetailData } from "@/app_modules/map/_component";
import { map_funGetOneById } from "@/app_modules/map/fun/get/fun_get_one_by_id";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentPortofolio_DetailDataMap({ mapId }: { mapId: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadData(mapId);
  }, [mapId]);

  async function onLoadData(mapId: string) {
    const res: any = await map_funGetOneById({ mapId: mapId });
    setData(res);
  }

  if (!data) return <ComponentMap_SkeletonDrawerDetailData />;

  return (
    <>
      <Stack mt={"lg"} spacing={"xl"} px={"md"}>
        <ComponentGlobal_AuthorNameOnHeader
          authorName={data?.Author?.username}
          imagesId={data?.Author?.Profile?.imagesId}
          profileId={data?.Author?.Profile?.id}
        />

        <SimpleGrid
          cols={2}
          spacing={"lg"}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: "md" },
            { maxWidth: 755, cols: 1, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <ComponentGlobal_LoadImage  maw={200}  url={APIs.GET + data.imageId} />
          {/* <Image
            radius={"sm"}
            mah={300}
            maw={200}
            alt="Photo"
            src={APIs.GET + data.imageId}
          /> */}
          <Box>
            <Grid>
              <Grid.Col span={2}>
                <IconBuildingSkyscraper />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{data?.Portofolio.namaBisnis}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconListDetails />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{data?.Portofolio.MasterBidangBisnis.name}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconPhoneCall />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>+{data?.Portofolio.tlpn}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={2}>
                <IconMapPin />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{data?.Portofolio.alamatKantor}</Text>
              </Grid.Col>
            </Grid>
          </Box>
        </SimpleGrid>

        <SimpleGrid
          cols={2}
          spacing={"lg"}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: "md" },
            { maxWidth: 755, cols: 1, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <Box />

          <Group position="center">
            <Button
              radius={"xl"}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
              onClick={() => {
                window.open(
                  `https://maps.google.com?q=${data?.latitude},${data?.longitude}`,
                  "_blank",
                  "width=800,height=600,noopener,noreferrer"
                );
              }}
            >
              Buka Maps
            </Button>
          </Group>
        </SimpleGrid>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
