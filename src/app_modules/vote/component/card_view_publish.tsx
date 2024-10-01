"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  Card,
  Stack,
  Grid,
  Avatar,
  Divider,
  Badge,
  Group,
  Text,
  Title,
  Box,
  Center,
  Progress,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { toNumber } from "lodash";
import { useState } from "react";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";

export default function ComponentVote_CardViewPublish({
  data,
  path,
  pilihanSaya,
  authorName,
  namaPilihan,
  statusArsip,
}: {
  data?: MODEL_VOTING;
  path: string;
  pilihanSaya?: boolean;
  authorName?: boolean;
  namaPilihan?: string;
  statusArsip?: boolean;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          {/* Header name */}
          {authorName ? (
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author.Profile as any}
            />
          ) : (
            ""
          )}

          {/* Isi deskripsi */}
          <Box
            onClick={() => {
              if (data?.id === undefined) {
                ComponentGlobal_NotifikasiPeringatan("Halaman tidak ditemukan");
              } else {
                setVisible(true);
                router.push(path + data?.id);
              }
            }}
          >
            <Stack spacing={"xl"}>
              <Stack align="center">
                <Text align="center" fw={"bold"}>
                  {data ? data.title : "Judul Voting"}
                </Text>
                <Badge
                  styles={{
                    root: {
                      backgroundColor: AccentColor.blue,
                      border: `1px solid ${AccentColor.skyblue}`,
                      color: "white",
                      width: "80%",
                    },
                  }}
                >
                  <Group>
                    <Text>
                      {data
                        ? data?.awalVote.toLocaleDateString(["id-ID"], {
                            dateStyle: "medium",
                          })
                        : "tgl awal voting"}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {data
                        ? data?.akhirVote.toLocaleDateString(["id-ID"], {
                            dateStyle: "medium",
                          })
                        : "tgl akhir voting"}
                    </Text>
                  </Group>
                </Badge>
              </Stack>
              {data ? (
                <Stack>
                  <Center>
                    <Title order={5}>Hasil Voting</Title>
                  </Center>

                  <Grid justify="center">
                    {data?.Voting_DaftarNamaVote.map((e) => (
                      <Grid.Col
                        key={e.id}
                        span={data?.Voting_DaftarNamaVote?.length >= 4 ? 6 : 4}
                      >
                        <Stack align="center">
                          <Avatar
                            radius={100}
                            size={70}
                            variant="outline"
                            color="yellow"
                          >
                            <Text>{e.jumlah}</Text>
                          </Avatar>
                          <Text fz={"xs"} align="center">
                            {e.value}
                          </Text>
                        </Stack>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              ) : (
                ""
              )}
            </Stack>

            {pilihanSaya ? (
              <Stack align="center" spacing={0} mt="md">
                <Text mb={"xs"} fw={"bold"} fz={"xs"}>
                  Pilihan anda:
                </Text>
                <Badge size="lg">
                  <Text truncate fz={"xs"}>
                    {namaPilihan}
                  </Text>
                </Badge>
              </Stack>
            ) : (
              ""
            )}

            {statusArsip ? (
              <Center mt="md">
                <Badge color={data?.isArsip ? "gray" : "green"}>
                  {data?.isArsip ? "Arsip" : "Publish"}
                </Badge>
              </Center>
            ) : (
              ""
            )}

            {visible && <ComponentGlobal_CardLoadingOverlay />}
          </Box>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
