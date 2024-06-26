"use client";
import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import _ from "lodash";
import {
  IconCaretRight,
  IconCaretRightFilled,
  IconChevronRight,
  IconCirclePlus,
  IconEyeCheck,
  IconPencilPlus,
} from "@tabler/icons-react";

import { MODEL_PORTOFOLIO_Lama } from "@/app_modules/model_global/portofolio";
import { useRouter } from "next/navigation";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { Warna } from "@/app/lib/warna";
import { MODEL_PROFILE } from "../../profile/model/interface";
import { MODEL_PORTOFOLIO } from "../model/interface";

export default function ListPortofolioView({
  listPorto,
  profile,
  userLoginId,
}: {
  listPorto: MODEL_PORTOFOLIO[];
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  // const [porto, setPorto] = useState(listPorto);
  const [loading, setLoading] = useState(false);
  const [loadingPorto, setLoadingPorto] = useState(false);
  const [idPorto, setIdPorto] = useState("");

  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Paper p={"md"} shadow="lg" withBorder bg={"gray.1"}>
        <Stack spacing={"sm"}>
          <Group position="apart">
            <ActionIcon variant="transparent" disabled></ActionIcon>
            <Title order={4}>Portofolio</Title>
            {profile?.User.id === userLoginId ? (
              <ActionIcon
                loading={loading ? true : false}
                variant="transparent"
                onClick={() => {
                  router.push(RouterPortofolio.create + `${profile.id}`);
                  setLoading(true);
                }}
              >
                <IconPencilPlus color={Warna.biru} />
              </ActionIcon>
            ) : (
              <ActionIcon variant="transparent" disabled></ActionIcon>
            )}
          </Group>
          <Box
            h={
              _.isEmpty(listPorto)
                ? 50
                : listPorto.length === 1
                ? 100
                : listPorto.length === 2
                ? 150
                : 200
            }
          >
            <ScrollArea h={"100%"} scrollbarSize={10}>
              {_.isEmpty(listPorto) ? (
                <Center>
                  <Text fs={"italic"} fz={"xs"} c={"gray"}>
                    - Belum Ada Portofolio -
                  </Text>
                </Center>
              ) : (
                <SimpleGrid
                  cols={4}
                  spacing="md"
                  breakpoints={[
                    { maxWidth: "md", cols: 3, spacing: "md" },
                    { maxWidth: "sm", cols: 2, spacing: "sm" },
                    { maxWidth: "xs", cols: 1, spacing: "sm" },
                  ]}
                >
                  {listPorto.map((e, i) => (
                    <Paper
                      shadow="sm"
                      key={i}
                      bg={"gray.5"}
                      radius={"md"}
                      onClick={() => {
                        setIdPorto(e?.id);
                        setLoadingPorto(true);
                        router.push(`/dev/portofolio/main/${e?.id}/`);
                      }}
                    >
                      <Grid align="center" p={"sm"}>
                        <Grid.Col span={"auto"}>
                          <Text fw={"bold"} lineClamp={1}>
                            {e?.namaBisnis}
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={"content"}>
                          <Stack>
                            {idPorto === e?.id && loadingPorto ? (
                              <Loader color="gray" size={25} />
                            ) : (
                              <IconCaretRight color="black" size={25} />
                            )}
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </Paper>
                  ))}
                </SimpleGrid>
              )}
            </ScrollArea>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
