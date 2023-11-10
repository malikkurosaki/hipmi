"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";
import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Divider,
  Grid,
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

export default function Admin_Investasi({
  listInvestasi,
  countDraft,
  countReview,
  countPublish,
  countReject,
}: {
  listInvestasi: MODEL_Investasi[];
  countDraft: number | any;
  countReview: number | any;
  countPublish: number | any;
  countReject: number | any;
}) {
  const [investasi, setInvestasi] = useState(listInvestasi);
  const router = useRouter();

  const listBox = [
    {
      id: 1,
      name: "Draft",
      jumlah: countDraft,
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
    },
    {
      id: 3,
      name: "Publish",
      jumlah: countPublish,
    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
    },
  ];

  const tableBody = investasi.map((e) => (
    <tr key={e.id}>
      <td>{e.title}</td>
      <td>
        {e.MasterStatusInvestasi.id === "3" ? (
          <Badge variant="dot" color="green">
            {e.MasterStatusInvestasi.name}
          </Badge>
        ) : (
          <Badge variant="dot" color="red">
            {e.MasterStatusInvestasi.name}
          </Badge>
        )}
      </td>
      <td>
        <ActionIcon
          variant="transparent"
          onClick={() =>
            router.push(RouterAdminInvestasi.halaman_aksi + `${e.id}`)
          }
        >
          <IconEdit />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <Title>Investasi</Title>
      <Divider mb={"md"} />
      <Grid mb={"md"}>
        {listBox.map((e) => (
          <Grid.Col sm={12} md={6} lg={3} key={e.id}>
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

      <Box my={"lg"}>
        <Center my={"xs"}>
          <Text>List Investasi</Text>
        </Center>
        <ScrollArea w={"100%"}>
          <Table withBorder highlightOnHover>
            <thead>
              <tr>
                <th>Nama Proyek Investasi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}

// const listTable = [
//   {
//     id: 1,
//     status: {
//       id: 1,
//       name: "Publish",
//     },
//     name: "Subway Kuta",
//   },
//   {
//     id: 2,
//     status: {
//       id: 2,
//       name: "Review",
//     },
//     name: "Event MCD",
//   },
//   {
//     id: 3,
//     status: {
//       id: 2,
//       name: " Review",
//     },
//     name: "Villa Batubulan",
//   },
//   {
//     id: 4,
//     status: {
//       id: 1,
//       name: "Publish",
//     },
//     name: "Kost Alif Denpasar",
//   },
//   {
//     id: 5,
//     status: {
//       id: 1,
//       name: "Publish",
//     },
//     name: "Pabrik Rokok Surya Gandum",
//   },
// ];
