"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const listBox = [
  {
    id: 1,
    name: "Investasi Baru",
    jumlah: 12,
  },
  {
    id: 2,
    name: "Investasi Aktif",
    jumlah: 3,
  },
  {
    id: 3,
    name: "Investasi Selesai",
    jumlah: 5,
  },
  {
    id: 4,
    name: "Total Proyek INvestasi",
    jumlah: 2,
  },
];

const listTable = [
  {
    id: 1,
    name: "Subway Kuta",
  },
  {
    id: 2,
    name: "Event MCD",
  },
  {
    id: 3,
    name: "Villa Batubulan",
  },
  {
    id: 4,
    name: "Kost Alif Denpasar",
  },
  {
    id: 5,
    name: "Pabrik Rokok",
  },
];

export default function Admin_Investasi() {
  const router = useRouter();

  const tableBody = listTable.map((e) => (
    <tr key={e.id}>
      <td>{e.name}</td>
      <td>
        <ActionIcon variant="transparent"
        onClick={() => router.push(RouterAdminInvestasi.halaman_aksi + `${e.id}`)}
        >
          <IconEdit />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col sm={12} md={6} lg={4} key={e.id}>
            <Paper h={100} bg={"gray"} p={"xs"}>
              <Center>
                <Stack spacing={0}>
                  <Text>{e.name}</Text>
                  <Center>
                    <Text fw={"bold"} fz={40}>
                      {e.jumlah}
                    </Text>
                  </Center>
                </Stack>
              </Center>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>

      <Box>
        <Center my={"xs"}>
          <Text>List Investasi</Text>
        </Center>
        <Table withBorder>
          <thead>
            <tr>
              <th>Nama Proyek Investasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </Box>
    </>
  );
}
