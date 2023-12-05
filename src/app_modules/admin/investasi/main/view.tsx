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
import {
  IconArrowBadgeRight,
  IconArrowBigRightLine,
  IconArrowsMaximize,
  IconCaretRight,
  IconChevronsDownRight,
  IconChevronsRight,
  IconEdit,
  IconZoomCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Admin_TablePublishInvestasi from "./table_publish";
import Admin_TableReviewInvestasi from "./table_review";
import Admin_TableRejectInvestasi from "./table_reject";
import moment from "moment";
import _ from "lodash";
import TableTotalInvestasi from "./table_total_investasi";
import TablePublikasiProgresInvestasi from "./table_publikasi_progres";

export default function Admin_Investasi({
  listInvestasi,
  countDraft,
  countReview,
  countPublish,
  countReject,
  totalInvestasiByUser,
  publishProgres,
}: {
  listInvestasi: MODEL_Investasi[];
  countDraft: number | any;
  countReview: number | any;
  countPublish: number | any;
  countReject: number | any;
  totalInvestasiByUser: any[];
  publishProgres: any[];
}) {
  const [investasi, setInvestasi] = useState(listInvestasi);
  const router = useRouter();

  const listBox = [
    {
      id: 1,
      name: "Draft",
      jumlah: countDraft,
      link: "",
      color: "yellow",
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      link: RouterAdminInvestasi.table_status_review,
      color: "orange",
    },
    {
      id: 3,
      name: "Publish",
      jumlah: countPublish,
      link: RouterAdminInvestasi.table_status_publish,
      color: "green",
    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      link: RouterAdminInvestasi.table_status_reject,
      color: "red",
    },
  ];

  return (
    <>
      <Stack spacing={"sm"}>
        <Title>Investasi</Title>
        <Divider mb={"md"} />
        {/* Status box */}
        <Grid mb={"md"}>
          {listBox.map((e) => (
            <Grid.Col sm={12} md={6} lg={3} key={e.id}>
              <Paper bg={`${e.color}.1`} p={"xs"} 
              // sx={{borderStyle: "solid", borderColor: e.color}}
              >
                <Stack align="center" justify="center" spacing={0} mb={-35}>
                  <Text tt={"uppercase"}>{e.name}</Text>
                  <Text fw={"bold"} fz={50}>
                    {e.jumlah}
                  </Text>
                </Stack>
                <Group position="right">
                  {e.link === "" ? (
                    <ActionIcon variant="transparent">
                    {/* <IconChevronsRight color="black" /> */}
                  </ActionIcon>
                  ) : (
                    <ActionIcon variant="transparent" onClick={() => router.push(e.link)}>
                      <IconChevronsRight color="black" />
                    </ActionIcon>
                  )}
                </Group>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        {/* Table Total & Progres */}
        <Grid>
          <Grid.Col sm={12} md={4} lg={4}>
            <TableTotalInvestasi totalInvestasiByUser={totalInvestasiByUser} />
          </Grid.Col>
          <Grid.Col sm={12} md={8} lg={8}>
            <TablePublikasiProgresInvestasi publishProgres={publishProgres} />
          </Grid.Col>
        </Grid>
      </Stack>

      {/* <TablePublish dataInvestsi={investasi as any} />
      <TableReview dataInvestsi={investasi as any} />
      <TableReject dataInvestsi={investasi as any} /> */}
      {/* <pre>{JSON.stringify(targetTerbesar, null, 2)}</pre> */}
    </>
  );
}
