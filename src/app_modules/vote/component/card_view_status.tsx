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

export default function ComponentVote_CardViewStatus({
  path,
}: {
  path: string;
}) {
  const router = useRouter();
  return (
    <>
      <Card
        shadow="lg"
        withBorder
        p={30}
        radius={"md"}
        onClick={() => router.push(path)}
      >
        {/* Isi deskripsi */}
        <Card.Section >
          <Stack>
            <Text fw={"bold"} truncate>Judul Voting : Pemilihan tempat wisata</Text>
            <Badge>
              <Group>
                <Text>
                  {new Date().toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
                <Text>-</Text>
                <Text>
                  {new Date(
                    moment(Date.now()).add(10, "days").calendar()
                  ).toLocaleDateString(["id-ID"], {
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
