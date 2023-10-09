"use client";
import { Box, Center, Grid, Paper, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { loadListPortofolio } from "../fun/fun_get_all_portofolio";
import _ from "lodash";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { loadDataProfile } from "../../profile/fun/fun_get_profile";
import { useAtom } from "jotai";
import { gs_profile } from "../../profile/state/global_state";
import getListPortofolio from "../api/get-portofolio";
import { gs_ListPortofolio } from "../state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { getProfile } from "../../profile";

export default function PortofolioView() {
  const [profile, setProfile] = useAtom(gs_profile);
  useShallowEffect(() => {
    loadProfile();
  }, []);
  async function loadProfile() {
    const get = await getProfile();
    if (!get) return myConsole("Data Kosong");
    setProfile(get);
  }
  const [listPorto, setListPorto] = useAtom(gs_ListPortofolio);
  useShallowEffect(() => {
    loadListPortofolio(profile?.id).then((res) => setListPorto(res));
  }, [profile?.id]);

  return (
    <>
      {/* {JSON.stringify(profile.id)}
      <br />
      {JSON.stringify(listPorto)} */}
      <Center>
        <Title order={4}>Portofolio</Title>
      </Center>
      <Box mt={"md"}>
        {(() => {
          if (listPorto) {
            return (
              <>
                {_.map(listPorto).map((e: any) => (
                  <Paper key={e.id} h={50} bg={"gray"} my={"md"}>
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
              </>
            );
          } else {
            return <></>;
          }
        })()}
      </Box>
    </>
  );
}
