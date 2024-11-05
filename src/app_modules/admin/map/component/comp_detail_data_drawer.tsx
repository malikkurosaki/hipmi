"use client";

import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import { Box, Button, Center, Grid, Stack, Text } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";
import { Admin_ComponentLoadImageLandscape } from "../../_admin_global";

export function ComponentAdminMap_DetailDataDrawer({
  data,
}: {
  data: MODEL_MAP;
}) {
  return (
    <>
      <Stack>
        <Admin_ComponentLoadImageLandscape fileId={data?.imageId as any} />

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
