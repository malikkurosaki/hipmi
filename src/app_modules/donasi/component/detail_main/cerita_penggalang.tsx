"use client";

import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Stack, Title, Paper, Group, ActionIcon, Text } from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";

export default function ComponentDonasi_CeritaPenggalangMain({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Stack spacing={"xs"}>
        <Title order={4}>Cerita Penggalang Dana</Title>
        <Paper p={"sm"} withBorder>
          <Stack>
            <Group position="apart">
              <Text>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
                  donasi.createdAt
                )}
              </Text>
              <ActionIcon
                loading={isLoading ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterDonasi.cerita_penggalang + `${donasi.id}`);
                }}
              >
                <IconCircleChevronRight />
              </ActionIcon>
            </Group>
            <Text lineClamp={4}>{donasi.CeritaDonasi.cerita}</Text>
            {/* <Text c={"blue"}>Baca selengkapnya</Text> */}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
