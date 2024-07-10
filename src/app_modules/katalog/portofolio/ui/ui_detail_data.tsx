import { Paper, Title, Stack, Grid, Text } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconPhoneCall,
  IconMapPin,
  IconListDetails,
  IconPinned,
} from "@tabler/icons-react";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export function Portofolio_UiDetailData({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  return (
    <>
      <Paper
        p={"sm"}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Title order={6}>Data Bisnis</Title>
        <Stack p={"sm"}>
          <Grid>
            <Grid.Col span={2}>
              <IconBuildingSkyscraper />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{dataPorto?.namaBisnis}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconPhoneCall />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>+{dataPorto?.tlpn}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconMapPin />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{dataPorto?.alamatKantor}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconListDetails />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{dataPorto?.MasterBidangBisnis.name}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconPinned />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{dataPorto?.deskripsi}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
