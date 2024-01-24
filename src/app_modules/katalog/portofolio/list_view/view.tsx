"use client";
import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import _ from "lodash";
import {
  IconCaretRightFilled,
  IconCirclePlus,
  IconPencilPlus,
} from "@tabler/icons-react";

import { LIST_PORTOFOLIO } from "@/app_modules/models/portofolio";
import { useRouter } from "next/navigation";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { Warna } from "@/app/lib/warna";
import { MODEL_PROFILE } from "../../profile/model/interface";

export default function ListPortofolioView({
  listPorto,
  profile,
  userLoginId,
}: {
  listPorto: LIST_PORTOFOLIO[];
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  const [porto, setPorto] = useState(listPorto);
  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Paper p={"md"} shadow="lg" withBorder bg={"gray.1"}>
        <Stack spacing={"lg"}>
          <Group position="apart">
            <ActionIcon variant="transparent" disabled></ActionIcon>
            <Title order={4}>Portofolio</Title>
            {profile.User.id === userLoginId ? (
              <ActionIcon
                variant="transparent"
                onClick={() =>
                  router.push(RouterPortofolio.create + `${profile.id}`)
                }
              >
                <IconPencilPlus color={Warna.biru} />
              </ActionIcon>
            ) : (
              <ActionIcon variant="transparent" disabled></ActionIcon>
            )}
          </Group>
          <Box>
            {_.isEmpty(porto) ? (
              <Center>
                <Text fs={"italic"} fz={"xs"}>
                  - Belum Ada Portofolio -
                </Text>
              </Center>
            ) : (
              <Box>
                {porto.map((e: any) => (
                  <Paper
                    key={e.id}
                    h={50}
                    bg={"gray"}
                    mb={"lg"}
                    radius={"xl"}
                    onClick={() => router.push(`/dev/portofolio/main/${e.id}/`)}
                  >
                    <Grid h={50} align="center" px={"md"}>
                      <Grid.Col span={10}>
                        <Text fw={"bold"}>{e.namaBisnis}</Text>
                      </Grid.Col>
                      <Grid.Col span={"auto"} h={50}>
                        <IconCaretRightFilled size={35} />
                      </Grid.Col>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
