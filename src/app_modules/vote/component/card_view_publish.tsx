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
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";

export default function ComponentVote_CardViewPublish({
  data,
  path,
  pilihanSaya,
  authorName,
  namaPilihan,
}: {
  data?: MODEL_VOTING;
  path: string;
  pilihanSaya?: boolean;
  authorName?: boolean;
  namaPilihan?: string;
}) {
  const router = useRouter();
  return (
    <>
      <Card shadow="lg" withBorder p={30} radius={"md"}>
        {/* Header name */}
        {authorName ? (
          <Card.Section>
            <ComponentGlobal_AuthorNameOnHeader
              authorName={data?.Author ? data?.Author.Profile.name : ""}
              imagesId={data?.Author ? data?.Author.Profile.imagesId : ""}
              profileId={data?.Author ? data?.Author.Profile.id : ""}
            />
          </Card.Section>
        ) : (
          ""
        )}
        {/* Isi deskripsi */}
        <Card.Section
          py={authorName ? "sm" : 0}
          onClick={() => {
            if (data?.id === undefined) {
              ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
            } else {
              router.push(path + data?.id);
            }
          }}
        >
          <Stack>
            <Text fw={"bold"}>{data ? data.title : "Judul Voting"}</Text>
            <Badge>
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
            {data ? (
              <Stack>
                <Grid>
                  {data?.Voting_DaftarNamaVote.map((v) => (
                    <Grid.Col key={v.id} span={"auto"}>
                      <Stack align="center" spacing={"xs"}>
                        <Text fz={10} lineClamp={1}>
                          {v.value}
                        </Text>

                        <Avatar radius={100} variant="outline" color="blue">
                          <Text>{v.jumlah}</Text>
                        </Avatar>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            ) : (
              <Stack>
                <Grid>
                  <Grid.Col span={6}>
                    <Stack align="center" spacing={"xs"}>
                      <Text fz={10}>Voting A</Text>
                      <Avatar radius={100} variant="outline" color="blue">
                        2
                      </Avatar>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack align="center" spacing={"xs"}>
                      <Text fz={10}>Voting B</Text>
                      <Avatar radius={100} variant="outline" color="red">
                        3
                      </Avatar>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
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
        </Card.Section>
      </Card>
    </>
  );
}
