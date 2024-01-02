"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function KabarDonasi() {
    const router = useRouter()
  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {Array(4)
          .fill(0)
          .map((e, i) => (
            <Paper key={i} bg={"gray.1"} p={"md"}>
              <Stack>
                <Group>
                  <Avatar variant="filled" radius={"xl"} />
                  <Stack spacing={0}>
                    <Text>Username</Text>
                    <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
                  </Stack>
                </Group>
                <Stack>
                  <Title order={5}>Judul Kabar</Title>
                  <Stack spacing={0}>
                    <Text lineClamp={2}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Aliquam nostrum vitae eum facilis similique minus
                      exercitationem assumenda, quidem dolores illum ducimus
                      fuga rem molestias? Numquam id praesentium dolor qui amet.
                    </Text>
                    <Text c={"blue"} onClick={() => router.push(RouterDonasi.detail_kabar)}>Buka Kabar</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ))}
      </SimpleGrid>
    </>
  );
}
