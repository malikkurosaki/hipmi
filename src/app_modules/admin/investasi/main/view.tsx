"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TablePublish from "./table_publish";
import TableReview from "./table_review";
import TableReject from "./table_reject";

export default function Admin_Investasi({
  listInvestasi,
  countDraft,
  countReview,
  countPublish,
  countReject,
  totalInvestasiByUser,
}: {
  listInvestasi: MODEL_Investasi[];
  countDraft: number | any;
  countReview: number | any;
  countPublish: number | any;
  countReject: number | any;
  totalInvestasiByUser: any[];
}) {
  const [investasi, setInvestasi] = useState(listInvestasi);
  const router = useRouter();

  const listBox = [
    {
      id: 1,
      name: "Draft",
      jumlah: countDraft,
      color: "yellow"
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      color: "orange"
      
    },
    {
      id: 3,
      name: "Publish",
      jumlah: countPublish,
      color: "green"

    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      color: "red"

    },
  ];

  return (
    <>
      <Title>Investasi</Title>
      <Divider mb={"md"} />
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col sm={12} md={6} lg={3} key={e.id}>
            <Paper 
            h={100} 
            p={"xs"} 
            bg={"gray"}
            // bg={e.color}
            >
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

      <Paper w={300}  radius={"md"} p={"sm"} sx={{borderStyle: "solid", borderColor: "teal"}} >
       <Stack spacing={"xl"}>
       <Title order={4}>Total Investasi Per User</Title>
        <Table >
          <thead>
            <tr>
              <th><Center>Username</Center></th>
              <th><Center>Total</Center></th>
            </tr>
          </thead>
          <tbody>
            {totalInvestasiByUser.map((e) => (
              <tr key={e.id}>
                <td><Group><Avatar variant="light" radius={"xl"}/> {e.username}</Group></td>
                <td><Center>{e._count.Investasi}</Center></td>
              </tr>
            ))}
          </tbody>
        </Table>
       </Stack>
      </Paper>
      {/* <TablePublish dataInvestsi={investasi as any} />
      <TableReview dataInvestsi={investasi as any} />
      <TableReject dataInvestsi={investasi as any} /> */}
      {/* <pre>{JSON.stringify(totalInvestasiByUser, null, 2)}</pre> */}
    </>
  );
}
