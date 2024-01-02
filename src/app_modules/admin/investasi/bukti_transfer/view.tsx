"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  Avatar,
  Badge,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Admin_BuktiTransferInvestasi() {
  const router = useRouter()
  const listUsername = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];
  return (
    <>
      {/* Box Username */}
      {listUsername.map((e) => (
        <Paper key={e.id} bg={"gray"} p={"md"} mb={"xs"} onClick={() => router.push(RouterAdminInvestasi.status_transfer)}>
          <Grid align="center">
            <Grid.Col span={6}>
              <Text>Username</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Badge variant="dot">Status Transfer</Badge>
            </Grid.Col>
          </Grid>
        </Paper>
      ))}
    </>
  );
}
