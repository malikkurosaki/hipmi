"use client";

import { Center, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { IconChevronCompactRight, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default function Colab_GrupDiskus() {
  const router = useRouter();
  return (
    <>
      <Stack>
        {Array(10)
          .fill(0)
          .map((e, i) => (
            <Paper
              key={i}
              withBorder
              shadow="lg"
              p={"md"}
              onClick={() => {
                router.push(RouterColab.detail_grup + i);
              }}
            >
              <Grid align="center" h={"100%"}>
                <Grid.Col span={"auto"}>
                  <Title order={6}>Nama Grup Diskusi</Title>
                </Grid.Col>
                <Grid.Col span={"content"}>
                  <Center>
                    <IconChevronRight color="gray" />
                  </Center>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
      </Stack>
    </>
  );
}
