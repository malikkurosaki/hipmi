"use client";

import {
  Card,
  Stack,
  Title,
  Badge,
  Group,
  Radio,
  Grid,
  Center,
  Text,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";

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
        shadow="lg"
        withBorder
        p={30}
        radius={"md"}
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
          <Stack>
            <Text fw={"bold"} truncate>
              {data?.title}
            </Text>
            <Badge>
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
        {/* <Card.Section py={"sm"}>
          <Stack>
            <Radio.Group>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Center>
                    <Text>
                      Nama Voting {""}
                      <Text fw={"bold"} inherit span>
                        A
                      </Text>
                    </Text>
                  </Center>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Center>
                    <Text>
                      Nama Voting {""}
                      <Text fw={"bold"} inherit span>
                        B
                      </Text>
                    </Text>
                  </Center>
                </Grid.Col>
              </Grid>
            </Radio.Group>
          </Stack>
        </Card.Section> */}
      </Card>
    </>
  );
}
