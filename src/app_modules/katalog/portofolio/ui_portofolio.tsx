import { useRouter } from "next/navigation";
import { MODEL_PROFILE } from "../profile/model/interface";
import { MODEL_PORTOFOLIO } from "./model/interface";
import { useState } from "react";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { Warna } from "@/app/lib/warna";
import {
  Paper,
  Stack,
  Group,
  ActionIcon,
  Title,
  Box,
  ScrollArea,
  Center,
  SimpleGrid,
  Grid,
  Loader,
  Text,
} from "@mantine/core";
import { IconPencilPlus, IconCaretRight } from "@tabler/icons-react";
import _ from "lodash";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_UI_Loader from "@/app_modules/component_global/ui/ui_loader";

export function Portofolio_UiView({
  listPorto,
  profile,
  userLoginId,
}: {
  listPorto: MODEL_PORTOFOLIO[];
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingPorto, setLoadingPorto] = useState(false);
  const [idPorto, setIdPorto] = useState("");
  return (
    <>
      <Box
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Stack spacing={"sm"}>
          <Group position="apart">
            <ActionIcon variant="transparent" disabled></ActionIcon>
            <Title order={4}>Portofolio</Title>
            {profile?.User.id === userLoginId ? (
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.push(RouterPortofolio.create + `${profile.id}`);
                  setLoading(true);
                }}
              >
                {loading ? (
                  <ComponentGlobal_UI_Loader />
                ) : (
                  <IconPencilPlus color={AccentColor.yellow} />
                )}
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
      </Box>
    </>
  );
}
