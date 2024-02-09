"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
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
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function ComponentVote_CardViewPublish({
  path,
  pilihanSaya,
}: {
  path: string;
  pilihanSaya?: boolean;
}) {
  const router = useRouter();
  return (
    <>
      <Card shadow="lg" withBorder p={30} radius={"md"}>
        {/* Header name */}
        <Card.Section>
          <ComponentGlobal_AuthorNameOnHeader />
        </Card.Section>

        {/* Isi deskripsi */}
        <Card.Section py={"sm"} onClick={() => router.push(path)}>
          <Stack>
            <Text fw={"bold"}>Voting Pemilihan Tempat Makan</Text>
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
          </Stack>
        </Card.Section>

        {pilihanSaya ? (
          <Card.Section py={"sm"}>
            <Stack align="center">
              <Title order={5}>Pilihan Saya : A</Title>
            </Stack>
          </Card.Section>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
