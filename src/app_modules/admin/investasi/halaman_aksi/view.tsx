"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Admin_HalamanAksi() {
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
      <Grid mb={"md"} align="center">
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
      </Grid>
    </>
  );
}
