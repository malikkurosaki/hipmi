import { APIs } from "@/app/lib";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";
import { useState } from "react";
import { adminMap_funGetOneById } from "../fun/fun_get_one_by_id";

export function ComponentAdminMap_DetailDataDrawer({
  mapId,
}: {
  mapId: string;
}) {
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadMap(mapId);
  }, [mapId]);

  async function onLoadMap(mapId: string) {
    try {
      const res = await adminMap_funGetOneById({ mapId: mapId });
      setData(res as any);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack>
        <AspectRatio ratio={1 / 1} mah={300}>
          <Image
            radius={"md"}
            width={300}
            alt="Photo"
            src={APIs.GET + data?.imageId}
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
              <Text>{data?.Portofolio.deskripsi}</Text>
            </Grid.Col>
          </Grid>
        </Box>

        {data ? (
          <Center>
            <Button
              radius={"xl"}
              onClick={() => {
                window.open(
                  `https://maps.google.com?q=${data?.latitude},${data?.longitude}`,
                  "_blank",
                  "width=800,height=600,noopener,noreferrer"
                );
              }}
            >
              Buka Google Map
            </Button>
          </Center>
        ) : (
          <Center>
            <Button radius={"xl"} disabled>
              Buka Google Map
            </Button>
          </Center>
        )}
      </Stack>
    </>
  );
}
