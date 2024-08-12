"use client";

import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
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
  SimpleGrid,
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
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";

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
      name: "Publish",
      jumlah: countPublish,
      link: RouterAdminInvestasi_OLD.table_status_publish,
      color: "green",
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      link: RouterAdminInvestasi_OLD.table_status_review,
      color: "orange",
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      link: RouterAdminInvestasi_OLD.table_status_reject,
      color: "red",
    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox.map((e, i) => (
            <Paper
              key={i}
              bg={`${e.color}.2`}
              shadow="md"
              radius="md"
              p="md"
              // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Group position="center">
                <Stack align="center" spacing={0}>
                  <Text>{e.name}</Text>
                  <Title>{e.jumlah}</Title>
                </Stack>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
