"use client";
import { Box, Center, Grid, Paper, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import _ from "lodash";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { loadDataProfile } from "../../profile/fun/fun_get_profile";
import { useAtom } from "jotai";
import { gs_profile } from "../../profile/state/global_state";
import { gs_ListPortofolio } from "../state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { getProfile } from "../../profile";
import { LIST_PORTOFOLIO } from "@/app_modules/models/portofolio";
import { useRouter } from "next/navigation";

export default function ListPortofolioView({
  listPorto,
}: {
  listPorto: LIST_PORTOFOLIO;
}) {
  const router = useRouter();
  const [porto, setPorto] = useState(listPorto);
  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Center>
        <Title order={4}>Portofolio</Title>
      </Center>
      <Box mt={"md"}>
        {(() => {
          if (porto) {
            return (
              <>
                {" "}
                {_.map(porto as any).map((e: any) => (
                  <Paper
                    key={e.id}
                    h={50}
                    bg={"gray"}
                    my={"md"}
                    radius={50}
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
