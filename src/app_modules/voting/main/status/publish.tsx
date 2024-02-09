"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  Avatar,
  Badge,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Radio,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_StatusPublish() {
  const router = useRouter();
  return (
    <>
      <Card
        shadow="lg"
        withBorder
        p={30}
        radius={"md"}
        onClick={() => {
          router.push(RouterVote.detail_publish);
        }}
      >
        {/* Isi deskripsi */}
        <Card.Section>
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
      </Card>
    </>
  );
}
