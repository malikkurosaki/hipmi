"use client";

import {
  AspectRatio,
  Box,
  Drawer,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ComponentAdmin_UIDrawerNotifikasi } from "../../notifikasi/ui_drawer_notifikasi";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import { useShallowEffect } from "@mantine/hooks";
import { adminMap_funGetOneById } from "../fun/fun_get_one_by_id";
import { useState } from "react";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconPhoneCall,
  IconMapPin,
  IconPinned,
} from "@tabler/icons-react";

export function ComponentAdminMap_Drawer({
  opened,
  onClose,
  mapId,
}: {
  opened: boolean;
  onClose: () => void;
  mapId: string;
}) {
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadMap(mapId);
  }, [mapId]);

  async function onLoadMap(mapId: string) {
    const res = await adminMap_funGetOneById({ mapId: mapId });
    setData(res as any);
  }

  return (
    <>
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              {data?.namePin}
            </Text>
          </Group>
        }
        opened={opened}
        onClose={onClose}
        position="right"
        size={"sm"}
      >
        <Stack>
          <AspectRatio ratio={1 / 1} mah={300}>
            <Image
              radius={"md"}
              width={300}
              alt="Foto"
              src={RouterMap.api_foto + data?.imagesId}
            />
          </AspectRatio>

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
            <Grid>
              <Grid.Col span={2}>
                <IconPinned />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text >{data?.Portofolio.deskripsi}</Text>
              </Grid.Col>
            </Grid>
          </Box>
        </Stack>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Drawer>
    </>
  );
}
