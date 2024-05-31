"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Stack,
  Title,
  Paper,
  Group,
  ActionIcon,
  Avatar,
  Text,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../noted_box";
import { useState } from "react";

export default function ComponentDonasi_InformasiPenggalangMain({
  author,
}: {
  author: MODEL_USER;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {/* <pre>{JSON.stringify(author, null, 2)}</pre> */}
      <Stack spacing={"xs"}>
        <Title order={4}>Informasi Penggalang Dana</Title>
        <Paper p={"sm"} withBorder>
          <Stack>
            <Group position="apart">
              <Title order={5}>Penggalang Dana</Title>
              <ActionIcon
                loading={isLoading ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterDonasi.penggalang_dana + `${author.id}`);
                }}
              >
                <IconCircleChevronRight />
              </ActionIcon>
            </Group>
            <Group>
              <Avatar radius={"xl"} variant="filled" bg={"blue"}>
                {(() => {
                  const usr = author.username;
                  const splt = usr.split("");
                  const Up = _.upperCase(splt[0]);

                  return Up;
                })()}
              </Avatar>
              <Text>{author.username}</Text>
            </Group>
            <ComponentDonasi_NotedBox
              informasi="Semua dana yang terkumpul akan disalurkan ke penggalang dana,
                  kabar penyaluran dapat dilihat di halaman kabar terbaru."
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
