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
      <Card
        radius={"md"}
        px={30}
        pt={authorName ? 30 : 10}
        pb={30}
        mb={"lg"}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
        }}
      >
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
                {data?.Voting_DaftarNamaVote.map((v, i) => (
                  <Stack key={v.id} spacing={0}>
                    <Group position="apart">
                      <Text>{v.value}</Text>
                      <Text>{v.jumlah}</Text>
                    </Group>
                    <Progress size={"xl"} radius={"xl"} value={v.jumlah} color="yellow" />
                  </Stack>
                
                ))}
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
        </Card.Section>
      </Card>
    </>
  );
}
