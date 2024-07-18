"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  Paper,
  Stack,
  Center,
  Title,
  Grid,
  Avatar,
  Divider,
  Text,
} from "@mantine/core";
import _ from "lodash";

import peserta from "../../main/kontribusi/peserta";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import { useRouter } from "next/navigation";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentEvent_ListPeserta({
  listPeserta,
  total,
}: {
  listPeserta: MODEL_EVENT_PESERTA[];
  total: number;
}) {
  const router = useRouter();
  return (
    <>
      <Paper
        mt={"lg"}
        p={"md"}
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: "white",
        }}
      >
        <Stack spacing={"md"} p={"md"}>
          <Center>
            <Title order={5}>Daftar Peserta ({total})</Title>
          </Center>

          {_.isEmpty(listPeserta) ? (
            <Center>
              <Text fz={"xs"} fw={"bold"}>
                - Tidak ada peserta -
              </Text>
            </Center>
          ) : (
            <Stack>
              {listPeserta.map((e, i) => (
                <Stack key={i} spacing={"sm"}>
                  <Grid>
                    <Grid.Col
                      span={"content"}
                      onClick={() => {
                        router.push(RouterProfile.katalog + e.User.Profile.id);
                      }}
                    >
                      <Avatar
                        sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                        radius={"xl"}
                        bg={"gray"}
                        size={30}
                        src={
                          RouterProfile.api_foto_profile +
                          e.User.Profile.imagesId
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Stack justify="center" h={"100%"}>
                        <Text>{e.User.Profile.name}</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </>
  );
}
