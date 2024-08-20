"use client";

import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { map_funGetOneById } from "../fun/get/fun_get_one_by_id";
import { MODEL_MAP } from "../lib/interface";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconPhoneCall,
  IconMapPin,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentMap_SkeletonDrawerDetailData } from "./skeleton_detail_data";

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
      <Stack mt={"lg"} spacing={"xl"}>
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
          <Image
            radius={"sm"}
            mah={300}
            maw={200}
            alt="Foto"
            src={RouterMap.api_foto + data?.imagesId}
          />
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
              onClick={() => {
                router.push(
                  RouterPortofolio.main_detail + data?.Portofolio.id,
                  { scroll: false }
                );
              }}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
            >
              Detail
            </Button>
          </Group>
        </SimpleGrid>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
