"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { UserSearch_searchByName } from "../fun/search/fun_search_by_name";
import { useRouter } from "next/navigation";
import ComponentGlobal_MaintenanceInformation from "@/app_modules/component_global/maintenance_information";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";

export default function UserSearch_MainView({
  listUser,
}: {
  listUser: MODEL_USER[];
}) {
  const router = useRouter();
  const [user, setUser] = useState(listUser);
  const [loading, setLoading] = useState(false);

  async function onSearch(name: string) {
    await UserSearch_searchByName(name).then((res) => setUser(res as any));
  }

  // return (
  //   <>
  //     <Center h={"50vh"}>
  //      <ComponentGlobal_MaintenanceInformation/>
  //     </Center>
  //   </>
  // );

  if(loading) return <ComponentGlobal_V2_LoadingPage/>

  return (
    <>
      <Box>
        {/* <pre>{JSON.stringify(user, null,2)}</pre>r */}
        <Stack spacing={"md"}>
          <TextInput
            icon={<IconSearch size={20} />}
            placeholder="Masukan nama pegguna"
            onChange={(val) => onSearch(val.target.value)}
          />
          {!user ? (
            ""
          ) : (
            <Box>
              {user?.map((e) =>
                e.Profile === null ? (
                  ""
                ) : (
                  <Stack key={e.id} spacing={"xs"} mt={"xs"}>
                    <Grid>
                      <Grid.Col span={2}>
                        <Center h={"100%"}>
                          <Avatar
                            sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                            radius={"xl"}
                            size={"md"}
                            src={
                              RouterProfile.api_foto_profile +
                              `${e?.Profile?.imagesId}`
                            }
                          />
                        </Center>
                      </Grid.Col>
                      <Grid.Col span={"auto"}>
                        <Stack spacing={0}>
                          <Text fw={"bold"} lineClamp={1}>
                            {e?.Profile?.name}
                          </Text>
                          <Text fz={"sm"} fs={"italic"}>
                            +{e?.nomor}
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Center h={"100%"}>
                          <ActionIcon
                            variant="transparent"
                            onClick={() => {
                              setLoading(true);
                              router.push(
                                RouterProfile.katalog + `${e?.Profile?.id}`
                              );
                            }}
                          >
                            <IconChevronRight />
                          </ActionIcon>
                        </Center>
                      </Grid.Col>
                    </Grid>
                    <Divider />
                  </Stack>
                )
              )}
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
}
