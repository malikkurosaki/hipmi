"use client";

import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Button,
  Grid,
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
import { map_funGetOneById } from "../fun/get/fun_get_one_by_id";
import { MODEL_MAP } from "../lib/interface";
import { ComponentMap_SkeletonDrawerDetailData } from "./skeleton_detail_data";
import { APIs } from "@/app/lib";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";

export function ComponentMap_DetailData({ mapId }: { mapId: any }) {
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
          <ComponentGlobal_LoadImage
            url={APIs.GET({ fileId: data?.imageId })}
          />
          {/* <Image radius={"sm"} mah={300} maw={200} alt="Photo" src={} /> */}
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
          <Button
            onClick={() => {
              router.push(RouterPortofolio.main_detail + data?.Portofolio.id, {
                scroll: false,
              });
            }}
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
          >
            Detail
          </Button>

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
        </SimpleGrid>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
