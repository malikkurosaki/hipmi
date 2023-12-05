"use client";

import {
  Paper,
  Stack,
  Center,
  Title,
  Table,
  Group,
  Avatar,
} from "@mantine/core";

export default function TableTotalInvestasi({
  totalInvestasiByUser,
}: {
  totalInvestasiByUser: any[];
}) {
  return (
    <>
      <Paper
        radius={"md"}
        bg={"gray.4"}

        p={"sm"}
        // sx={{ borderStyle: "solid", borderColor: "teal" }}
      >
        <Stack spacing={"xl"}>
          <Center>
            <Title order={4}>Total Investasi Pengguna</Title>
          </Center>
          <Table bg={"gray.2"} sx={{borderRadius: "10px"}}>
            <thead>
              <tr>
                <th>
                  <Center>Username</Center>
                </th>
                <th>
                  <Center>Total</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {totalInvestasiByUser.map((e) => (
                <tr key={e.id}>
                  <td>
                    <Group>
                      <Avatar variant="gradient" radius={"xl"} /> {e.username}
                    </Group>
                  </td>
                  <td>
                    <Center>{e._count.Investasi}</Center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Paper>
    </>
  );
}
