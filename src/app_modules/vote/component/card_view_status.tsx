"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../model/interface";

export default function ComponentVote_CardViewStatus({
  path,
  data,
}: {
  path?: string;
  data?: MODEL_VOTING;
}) {
  const router = useRouter();
  return (
    <>
      <Card
        p={30}
        mb={"lg"}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
        }}
        onClick={() => {
          if (data?.id === undefined) {
            ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
          } else {
            router.push((path as string) + data?.id);
          }
        }}
      >
        {/* Isi deskripsi */}
        <Card.Section>
          <Stack px={"xs"} align="center">
            <Text fw={"bold"} lineClamp={1} align="center">
              {data?.title}
            </Text>
            <Badge
              // size="md"
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
                  {data?.awalVote.toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
                <Text>-</Text>
                <Text>
                  {data?.akhirVote.toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
              </Group>
            </Badge>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
