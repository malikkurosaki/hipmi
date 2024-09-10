"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { Center, Grid, Paper, Stack, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditInvestasi({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [listId, setListId] = useState(0);

  const listEdit = [
    {
      id: 1,
      name: "Intro",
      route: RouterInvestasi_OLD.edit_intro,
    },
    {
      id: 2,
      name: "Prospektus",
      route: RouterInvestasi_OLD.edit_prospektus,
    },
    {
      id: 3,
      name: "Dokumen",
      route: RouterInvestasi_OLD.edit_dokumen,
    },
    // {
    //   id: 4,
    //   name: "Berita",
    //   route: RouterInvestasi.list_edit_berita,
    // },
  ];
  return (
    <>
      {listEdit.map((e) => (
        <Paper
          shadow="lg"
          key={e.id}
          w={"100%"}
          bg={"gray.4"}
          mb={"md"}
          onClick={() => {
            setLoading(true);
            setListId(e.id);
            router.push(e.route + `${id}`);
          }}
        >
          {isLoading && e.id === listId ? (
            <ComponentGlobal_CardLoadingOverlay />
          ) : (
            ""
          )}
          <Grid justify="center" h={70} px={"sm"}>
            <Grid.Col span={10} h={"100%"}>
              <Stack h={"100%"} justify="center">
                <Title order={4} fw={"bold"}>
                  {e.name}
                </Title>
              </Stack>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center h={"100%"}>
                <IconChevronRight />
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
      ))}
    </>
  );
}
