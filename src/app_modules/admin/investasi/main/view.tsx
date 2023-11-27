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
import TablePublish from "./table_publish";
import TableReview from "./table_review";
import TableReject from "./table_reject";

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
      <TablePublish dataInvestsi={investasi as any} />
      <TableReview dataInvestsi={investasi as any} />
      <TableReject dataInvestsi={investasi as any} />
      {/* <pre>{JSON.stringify(investasi, null, 2)}</pre> */}
    </>
  );
}






