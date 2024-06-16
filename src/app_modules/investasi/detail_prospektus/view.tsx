"use client";

import { Paper, Grid, Center, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import {
  MODEL_Investasi,
  Model_Prospektus_Investasi,
} from "../model/model_investasi";
import { useState } from "react";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export default function DetailPropektus({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_Investasi;
}) {
  const [prospek, setProspek] = useState(dataInvestasi);

  return (
    <>
      {prospek.ProspektusInvestasi !== null ? (
        <Link
          href={RouterInvestasi.api_file_prospektus + `${prospek.ProspektusInvestasi.id}`}
          target="_blank"
          style={{ textDecorationLine: "none" }}
        >
          <Paper w={"100%"} bg={"gray"} mb={"md"}>
            <Grid align="center" justify="center" px={"sm"}>
              <Grid.Col span={10}>
                <Text>Prospektus_{prospek.title}</Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center>
                  <IconChevronRight />
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
        </Link>
      ) : (
        <Center>
          <Title order={6}>Tidak Ada File</Title>
        </Center>
      )}
    </>
  );
}
