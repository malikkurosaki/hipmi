"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  AspectRatio,
  Box,
  Card,
  Grid,
  Image,
  Paper,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export default function ComponentDonasi_CardPublish({
  data,
  path,
}: {
  data: any;
  path: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [donasiId, setDonasiId] = useState("");

  return (
    <>
      <Card
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
        }}
        onClick={() => {
          setVisible(true);
          setDonasiId(data.id);
          router.push(path + `${data.id}`);
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={7}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"md"}>
                  <Image
                    alt="Foto"
                    src={RouterDonasi.api_gambar + `${data.imagesId}`}
                    radius={"xs"}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={5}>
              <Stack spacing={"xs"}>
                <Stack spacing={0}>
                  <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                    {data.title}
                  </Text>
                  <ComponentDonasi_TampilanHitungMundur
                    durasi={data?.DonasiMaster_Durasi?.name}
                    publishTime={data.publishTime}
                    textSize={10}
                  />
                </Stack>
                <Progress value={+data.progres} color="yellow" />
                <Stack spacing={0}>
                  <Text fz={"sm"}>Terkumpul</Text>
                  <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                    <TampilanRupiahDonasi nominal={+data.terkumpul} />
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
          {/* {width > 575 ? "" : <Divider />} */}
        </Stack>
        {visible && donasiId !== "" ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
