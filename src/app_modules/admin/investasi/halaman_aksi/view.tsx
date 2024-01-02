"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Admin_HalamanAksi({idInves}: {idInves: string}) {
  const router = useRouter();
  const listHalamanAksi = [
    {
      id: 1,
      name: "Konfirmasi",
      desc: "Publis atau non - aktifkan proyek invetsasi",
      route: RouterAdminInvestasi.konfirmasi,
    },
    {
      id: 2,
      name: "Bukti Transfer",
      desc: "Lihat bukti transfer investor",
      route: RouterAdminInvestasi.bukti_transfer,
    },
  ];

  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="sm"
        breakpoints={[
          // { maxWidth: "lg", cols: 6, spacing: "lg" },
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "xs" },
        ]}
      >
        {listHalamanAksi.map((e) => (
          <Paper key={e.id} bg={"gray"} p={"sm"}>
            <Stack>
              <Stack spacing={0}>
                <Title order={6}>{e.name}</Title>
                <Text fz={"sm"}>{e.desc}</Text>
              </Stack>
              <Center>
                <Button
                  compact
                  radius={50}
                  w={100}
                  onClick={() => router.push(e.route + `${idInves}`)}
                >
                  Lihat
                </Button>
              </Center>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
      {/* <Grid mb={"md"} align="center">
        {listHalamanAksi.map((e) => (
          <Grid.Col key={e.id} onClick={() => router.push(e.route)}>
            <Paper bg={"gray"} p={"xs"}>
              <Grid align="center">
                <Grid.Col span={10}>
                  <Stack spacing={0}>
                    <Title order={5}>{e.name}</Title>
                    <Text fw={"lighter"} fz={"xs"}>
                      {e.desc}
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={2}>
                  <IconChevronRight />
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        ))}
      </Grid> */}
    </>
  );
}
