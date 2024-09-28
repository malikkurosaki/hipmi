"use client";

import { Paper, Title, Stack, Grid, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export function Portofolio_UiSosialMedia({
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
        <Title order={6}>Media Sosial Bisnis</Title>

        <Stack p={"sm"}>
          <Grid>
            <Grid.Col span={2}>
              <IconBrandFacebook />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              {dataPorto?.Portofolio_MediaSosial.facebook ? (
                <Text>{dataPorto?.Portofolio_MediaSosial.facebook}</Text>
              ) : (
                "-"
              )}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconBrandInstagram />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              {dataPorto?.Portofolio_MediaSosial.instagram ? (
                <Text>{dataPorto?.Portofolio_MediaSosial.instagram}</Text>
              ) : (
                "-"
              )}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconBrandTiktok />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              {dataPorto?.Portofolio_MediaSosial.tiktok ? (
                <Text>{dataPorto?.Portofolio_MediaSosial.tiktok}</Text>
              ) : (
                "-"
              )}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconBrandTwitter />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              {dataPorto?.Portofolio_MediaSosial.twitter ? (
                <Text>{dataPorto?.Portofolio_MediaSosial.twitter}</Text>
              ) : (
                "-"
              )}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconBrandYoutube />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              {dataPorto?.Portofolio_MediaSosial.youtube ? (
                <Text>{dataPorto?.Portofolio_MediaSosial.youtube}</Text>
              ) : (
                "-"
              )}
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
