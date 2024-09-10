import { Box, Button, Center, Grid, Skeleton, Stack } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";

export function ComponentAdminMap_SkeletonDrawer() {
  return (
    <>
      <Stack>
        <Skeleton h={300} width={300} />
        <Box>
          <Grid>
            <Grid.Col span={2}>
              <IconBuildingSkyscraper />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton radius={"xl"} h={10} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconListDetails />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton radius={"xl"} h={10} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconPhoneCall />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton radius={"xl"} h={10} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconMapPin />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton radius={"xl"} h={10} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconPinned />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton radius={"xl"} h={10} />
            </Grid.Col>
          </Grid>
        </Box>
        <Center>
          <Button radius={"xl"} disabled>
            Buka Google Map
          </Button>
        </Center>
      </Stack>
    </>
  );
}
